const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const deleteBtnStartTime = document.querySelectorAll('.delStartTime')
const deleteBtnStartLocation = document.querySelectorAll('.delStartLocation')
const deleteBtnFinishTime = document.querySelectorAll('.delFinishTime')

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

Array.from(deleteBtnFinishTime).forEach((el) => {
    el.addEventListener('click', deleteFinishTime)
})

async function deleteJob(){
    const jobId = this.parentNode.parentNode.dataset.id
    console.log('jobId ', jobId)
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
    // const startId = this.parentNode.dataset.id

    // Get the <li> element that contains the delete button
    const startItem = this.previousElementSibling
    console.log('startItem ', startItem)

    // Get the job ID from the data-id attribute of the <li> element
    const startId = startItem.getAttribute('data-id')
    console.log('startId ', startId)

    

    console.log('startId ', startId)
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

async function deleteFinishTime(){
    console.log('I am running')
    const finishItem = this.previousElementSibling

    const finishId = finishItem.getAttribute('data-id')
    try{
        const response = await fetch('jobs/deleteFinishTime', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'finishTimeIdFromJSFile': finishId
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

    const startLocotionItem = this.previousElementSibling
    const startLocationId = startLocotionItem.getAttribute('data-id')
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

var myLatLng = { lat: 51.509865, lng: -0.118092 };
var mapOptions = {
    center: myLatLng,
    zoom: 9,
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

    console.log('spanArray ', spanArray)


    const startLocation = spanArray.find(element => element.id === 'startLocationSpan').innerText;
    console.log('startLocation test: ', startLocation)
    const startLocationInnerText = startLocation.innerText
    console.log('startLocationInnerText ', startLocationInnerText)

    // Filter the list of <span> elements by their text content
    const postcodeElements = spanArray.filter(element => element.classList.contains('postcodeSpan'));
    console.log('postcodeElements', postcodeElements)
   

    const startTime = document.getElementById('startTimeSpan').innerText
    // const startTime = spanArray.filter(element => element.innerText.includes('Start Time:')).map(el => el.innerText.split(' '))[0]
    console.log('startTime ', startTime)
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
        console.log('postcodeElements[i] ', postcodeElements[i])
        const text = postcodeElements[i].innerText;
        console.log('postcodestext', text)
        // Extract the postcode from the text (assumes the postcode is the second word in the text)
        const postcode = text.split(' ')[0];

        // Get the checkbox element with the corresponding id
        const checkbox = postcodeElements[i].previousElementSibling
        console.log('postcode checkbox ', checkbox)

        // Check if the checkbox is checked
        if (checkbox.checked) {
            console.log('this is the postcode checkbox and its checked')
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
    const lengthElements = spanArray.filter(element => element.classList.contains('jobLengthSpan'));
    console.log('lengthElements ', lengthElements)
    // Create an array to store the estimated job lengths
    const lengths = [];

    // Loop through the selected elements and extract the estimated job lengths
    for (let i = 0; i < lengthElements.length; i++) {
        console.log(`lengthElements[${i}] `, lengthElements[i])
        // Get the text inside the <span> elemeint
        const text = lengthElements[i].innerText;
        console.log(`text ${text}`)

        // Extract the hours and minutes from the text
        const [hours, minutes] = [text.split(' ')[0], text.split(' ')[2]]

        // Get the checkbox element with the corresponding id
        const checkbox = lengthElements[i].previousElementSibling;
        console.log('length checkbox', checkbox)


        // Check if the checkbox is checked
        if (checkbox.querySelector('input').checked) {
        // Add the hours and minutes to the array if the checkbox is checked
            console.log('ima checked')
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

            if (finishMinutes < 10) {
                finishMinutes = '0' + finishMinutes
            }

            console.log('finishHour after ', finishHour)
            console.log('finishMinutes  after', finishMinutes)
            
            // Create a string with the hours and minutes
            const durationString = hours + " hours " + minutes + " minutes";
            const finishTime = finishHour + ':' + finishMinutes

            //Get the finish time from the document in order to compare it to the calculated finish time
            let finishTimeSetByWorker = document.getElementById('finishTimeSpan').innerText;
            console.log('finishTimeSetByWorker', finishTimeSetByWorker)

            console.log('startTime ', startTime)
            // Convert the starttime and the finishTimeSetByWorker strings to Date objects
            const date1 = new Date(`1970-01-01T${startTime}`);
            const date2 = new Date(`1970-01-01T${finishTimeSetByWorker}`);
            console.log('date1 ', date1)
            
            // Get the hour and minute components of each time
            const hour1 = date1.getHours();
            const minute1 = date1.getMinutes();
            const hour2 = date2.getHours();
            const minute2 = date2.getMinutes();

            console.log('hour1 ', hour1)
            console.log('minute1 ', minute1)
            console.log('hour2 ', hour2)
            console.log('minute2 ', minute2)

            // Calculate the difference between the hours and minutes of the two times
            let hourDiff = hour2 - hour1;
            let minuteDiff = 0;
            if (minute1 > minute2) {
            // If minute1 is greater than minute2, subtract minute1 from 60 and then minute2 from the result
            // This gives the correct difference between the minutes in the 'hh:mm' format
            minuteDiff = 60 - minute1 + minute2;
            // Decrement hourDiff by 1 to take into account the fact that an extra hour has been borrowed to calculate the minutes difference
            hourDiff -= 1;
            } else {
            // If minute1 is less than or equal to minute2, simply subtract minute1 from minute2
            minuteDiff = minute2 - minute1;
            }

            // Convert the difference in hours and minutes to the 'hh:mm' format using Math.floor() and Math.abs()
            const hourDiffAbs = Math.floor(Math.abs(hourDiff));
            const hourString = hourDiffAbs < 10 ? `0${hourDiffAbs}` : `${hourDiffAbs}`;
            const minuteString = minuteDiff < 10 ? `0${minuteDiff}` : `${minuteDiff}`;
            const diffString = `${hourString}:${minuteString}`;

            // Print the formatted difference between the two times
            let durationCheck = hours + ':' + minutes;

            console.log('durationString.split(\':\')[0] ', durationString.split(':')[0])
            console.log('diffString.split(\':\')[0] ', diffString.split(':')[0])
            //See if the hours of the day are greater than the estimated hours alert
            if (+durationCheck.split(':')[0] > +diffString.split(':')[0]) {
                alert('hello')
                document.querySelector('#finishTimeWarning').innerText = "With this many jobs you will be home later than you are aiming for, consider unchecking one or more jobs and calculating again"
            } else if (+durationCheck.split(':')[0] == +diffString.split(':')[0] && +durationCheck.split(':')[1] > +diffString.split(':')[1]) {
                alert('hello')
                document.querySelector('#finishTimeWarning').innerText = "With this many jobs you will be home later than you are aiming for, consider unchecking one or more jobs and calculating again"
            }
            
            // Get the container holding the output element that is currently hidden
            const outputHolder = document.getElementById('outputHolder')

            //remove the hidden class from it
            outputHolder.classList.remove("hide");

            // Get the output element
            const output = document.querySelector('#output');

            //convert the distance to miles
            const distanceInMiles = Math.round(distance * 0.000621371)

            displayFinishHour = finishHour

            if (displayFinishHour < 10) {
                displayFinishHour = '0' + displayFinishHour
            }

            displayFinishTime = displayFinishHour + ':' + finishMinutes


            // Update the output with the total distance and duration
            output.innerHTML = "<div class='alert-info'><h3>Total distance: </h3><span>" + distanceInMiles + " miles.</span><h3>Total duration: </h3><span>" + durationString + ".</span><h3>Finish Time: </h3><span class='time'>" + displayFinishTime + "</span></div>";

            

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