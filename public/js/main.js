const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const deleteBtnStartTime = document.querySelectorAll('.delStartTime')
const deleteBtnStartLocation = document.querySelectorAll('.delStartLocation')

document.querySelector("#routebtn").addEventListener('click', calcRoute)

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteJob)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(deleteBtnStartTime).forEach((el) => {
    el.addEventListener('click', deleteStartTime)
})

Array.from(deleteBtnStartLocation).forEach((el) => {
    el.addEventListener('click', deleteStartLocation)
})

async function deleteJob(){
    const jobId = this.parentNode.dataset.id
    try{
        const response = await fetch('jobs/deleteJob', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'jobIdFromJSFile': jobId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function deleteStartTime(){
    console.log('I am running')
    const startId = this.parentNode.dataset.id
    try{
        const response = await fetch('jobs/deleteStartTime', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'startTimeIdFromJSFile': startId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function deleteStartLocation(){
    console.log('I am running')
    const startLocationId = this.parentNode.dataset.id
    try{
        const response = await fetch('jobs/deleteStartLocation', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'startLocationIdFromJSFile': startLocationId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//set map options

var myLatLng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


function calcRoute() {
    const geocoder = new google.maps.Geocoder();

    // Select all <span> elements
    const spanElements = document.querySelectorAll('span');

    // Convert the NodeList to an array
    const spanArray = Array.from(spanElements);


    const startLocation = spanArray.filter(element => element.innerText.includes('Start Location:')).map(el => el.innerText.split(' '))[0][2]

    // Filter the list of <span> elements by their text content
    const postcodeElements = spanArray.filter(element => element.innerText.includes('Postcode:'));

    const startTime = spanArray.filter(element => element.innerText.includes('Start Time:')).map(el => el.innerText.split(' '))[0][2]
    const startHour = startTime.split(':')[0]
    const startMinutes = startTime.split(':')[1]

    console.log('startTime ', startTime)
    console.log('startHour ', startHour)
    console.log('startMinutes ', startMinutes)

    // Create an array to store the postcodes
    const postcodes = [];

    // Loop through the selected elements and extract the postcodes
    for (let i = 0; i < postcodeElements.length; i++) {
        // Get the text inside the <span> element
        const text = postcodeElements[i].innerText;

        // Extract the postcode from the text (assumes the postcode is the second word in the text)
        const postcode = text.split(' ')[1];

        // Get the checkbox element with the corresponding id
        const checkbox = document.getElementById(postcodeElements[i].parentElement.dataset.id);

        // Check if the checkbox is checked
        if (checkbox.checked) {

        // Add the postcode to the array if the checkbox is checked
            postcodes.push(postcode);
        }
    }

    // Create an array of waypoints from the postcodes
    const waypoints = postcodes.map(postcode => ({

        location: postcode,
        stopover: true
    }));

    // Select all <span> elements containing the estimated job length
    const lengthElements = spanArray.filter(element => element.innerText.includes('Estimated job length:'));

    // Create an array to store the estimated job lengths
    const lengths = [];

    // Loop through the selected elements and extract the estimated job lengths
    for (let i = 0; i < lengthElements.length; i++) {
        // Get the text inside the <span> element
        const text = lengthElements[i].innerText;
        console.log(`text ${text}`)

        // Extract the hours and minutes from the text
        const [hours, minutes] = [text.split(' ')[3], text.split(' ')[5]]

        // Get the checkbox element with the corresponding id
        const checkbox = document.getElementById(lengthElements[i].parentElement.dataset.id);

        // Check if the checkbox is checked
        if (checkbox.checked) {
        // Add the hours and minutes to the array if the checkbox is checked
            lengths.push({ hours: Number(hours), minutes: Number(minutes) });
        };
    }

    for (const length of lengths) {
        console.log(`length.hours ${length.hours}`)
        console.log(`length.minutes ${length.minutes}`)
    }
    // Create the request object
    var request = {
        origin: startLocation,
        destination: startLocation,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }



    // Pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Calculate the total distance and duration of the route
            let distance = 0;
            let duration = 0;
            for (const leg of result.routes[0].legs) {
                distance += leg.distance.value;
                duration += leg.duration.value;
            }
            
            // Declare the `hours` and `minutes` variables inside the callback function
            let hours = 0;
            let minutes = 0;

            // Create a Date object from the duration value
            const date = new Date(duration * 1000);

            // Get the number of hours and minutes from the Date object
            hours = date.getUTCHours();
            minutes = date.getUTCMinutes();   

            // console.log(`hours: ${hours}`)
            // console.log(`minutes: ${minutes}`)

            // Add the hours and minutes from the lengths array to the `hours` and `minutes` variables
            for (const length of lengths) {
                //console.log(`length.hours ${length.hours}`)
                //console.log(`length.minutes ${length.minutes}`)

                hours += length.hours;
                minutes += length.minutes;

                // Make sure the `minutes` variable does not exceed 59
                if (minutes >= 60) {
                    hours += 1;
                    minutes -= 60;
                }
            }

            console.log(`hours: ${hours}`)
            console.log(`minutes: ${minutes}`)

            //Use the start time and the hours worked to calculate the finish time

            
            let finishHour = (+hours + +startHour) % 24
            let finishMinutes = (+minutes + + startMinutes)
            console.log('finishHour ', finishHour)
            console.log('finishMinutes ', finishMinutes)

            while (finishMinutes > 60) {
                finishMinutes -= 60
                finishHour += 1
            }

            console.log('finishHour after ', finishHour)
            console.log('finishMinutes  after', finishMinutes)
            
            // Create a string with the hours and minutes
            const durationString = hours + " hours " + minutes + " minutes";
            const finishTime = finishHour + ':' + finishMinutes

            // Get the output element
            const output = document.querySelector('#output');

            // Update the output with the total distance and duration
            output.innerHTML = "<div class='alert-info'>Total distance: " + distance + ".<br />Total duration: " + durationString + ".<br />Finish Time: " + finishTime + ".</div>";

            // Display the route on the map
            directionsDisplay.setDirections(result);
        } else {
            // Delete the route from the map
            directionsDisplay.setDirections({ routes: [] });
            // Center the map in London
            map.setCenter(myLatLng);

            // Show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });
}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);