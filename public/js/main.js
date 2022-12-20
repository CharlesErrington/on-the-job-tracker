const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const deleteBtnStartTime = document.querySelectorAll('.delStartTime')
const deleteBtnStartLocation = document.querySelectorAll('.delStartLocation')
const deleteBtnFinishTime = document.querySelectorAll('.delFinishTime')
const changeOrderUp = document.querySelectorAll('.button-up')
const changeOrderDown = document.querySelectorAll('.button-down')
const closeAlertButton = document.querySelector('.close-btn')

closeAlertButton.addEventListener('click', closeAlert)

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


Array.from(changeOrderUp).forEach((el) => {
    el.addEventListener('click', changeJobOrderUp)
})

Array.from(changeOrderDown).forEach((el) => {
    el.addEventListener('click', changeJobOrderDown)
})

function closeAlert() {
    document.querySelector('.alert').classList.add('hide');
}

async function changeJobOrderDown() {
    const jobBelow = this.parentNode.parentNode.parentNode.parentNode.nextElementSibling
    const jobBelowLi = jobBelow.querySelector('li');
    const jobBelowId = jobBelowLi.getAttribute('data-id');
    const clickedJobId = this.parentNode.parentNode.parentNode.getAttribute('data-id')
    const clickedJobOrder = this.parentNode.nextElementSibling.innerText
    const jobBelowOrder = jobBelow.querySelector('.jobItemOrder').innerText

    try {
        const response = await fetch('jobs/changeJobOrderDown', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'jobBelowId': jobBelowId,
                'clickedJobId': clickedJobId,
                'clickedJobOrder': clickedJobOrder,
                'jobBelowOrder': jobBelowOrder
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
        } catch(err){
            console.log(err)
    }
}

async function changeJobOrderUp() {
    const jobAbove = this.parentNode.parentNode.parentNode.parentNode.previousElementSibling
    const jobAboveLi = jobAbove.querySelector('li');
    const jobAboveId = jobAboveLi.getAttribute('data-id');
    console.log(jobAboveId);
    const clickedJobId = this.parentNode.parentNode.parentNode.getAttribute('data-id')
    console.log(clickedJobId)
    const clickedJobOrder = this.parentNode.nextElementSibling.innerText
    const jobAboveOrder =   jobAbove.querySelector('.jobItemOrder').innerText
    console.log('clickedJobOrder ', clickedJobOrder)
    console.log('jobAboveOrder ', jobAboveOrder)
    try{
        const response = await fetch('jobs/changeJobOrderUp', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'jobAboveId':jobAboveId,
                'jobAboveOrder': jobAboveOrder,
                'clickedJobOrder': clickedJobOrder,
                'clickedJobId': clickedJobId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }
}



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

    //Find the start location in the spanArray
    const startLocation = spanArray.find(element => element.id === 'startLocationSpan').innerText;

    // Filter the list of <span> elements by their text content
    const postcodeElements = spanArray.filter(element => element.classList.contains('postcodeSpan'));
   
    //Get the startTime form the document
    const startTime = document.getElementById('startTimeSpan').innerText

    //Split the startTime into seperate hour and minute variables
    const startHour = startTime.split(':')[0]
    const startMinutes = startTime.split(':')[1]

    //Pull out the innerText of the postcode elements, filter for the ones that are checked and make an array of the postcodes
    const postcodes = createPostcodesArray(postcodeElements)


    // Create an array of waypoints from the postcodes
    const waypoints = postcodes.map(postcode => ({
        location: postcode,
        stopover: true
    }));

    // Select all <span> elements containing the estimated job length
    const lengthElements = spanArray.filter(element => element.classList.contains('jobLengthSpan'));



    const lengths = createLengthsArray(lengthElements)

    const lengthsFormattedToHHMM = createFormattedLengthsArray(lengthElements)
   

    // Create the request object
    const request = {
        origin: startLocation,
        destination: startLocation,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }



    // Pass the request to the route method
    directionsService.route(request, async function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Calculate the total distance and duration of the route
            let distance = 0;
            let duration = 0;
            let durationLegArray = []
            for (const leg of result.routes[0].legs) {
                distance += leg.distance.value;
                duration += leg.duration.value;
                durationLegArray.push(leg.duration.value)
            }



            // Convert the durations in the duration leg array to hours:minutes

            durationLegArray = durationLegArray.map(el => {
                const hours = Math.floor(el / 3600);
                const minutes = Math.floor((el % 3600) / 60)
                return `${hours}:${minutes}`
            })

            console.log('This is the durationLegArray converted to hours and minutes ', durationLegArray)
            console.log('this is the lengths array which is the length of the jobs, or time on site', lengths)
            console.log('this is the formatted lengths array ', lengthsFormattedToHHMM)

            let postcodeArrivalTimes = calculatePostcodeArrivalTimes(startTime, durationLegArray, lengthsFormattedToHHMM, postcodes)
            
            
            let timeWorked = calculateTimeWorked(lengths, duration)
            
            let hours = timeWorked[0]
            let minutes = timeWorked[1]

            // Create a string with the hours and minutes
            const durationString = hours + " hours " + minutes + " minutes";

            //Use the start time and the hours worked to calculate the finish time
            const finishTime = calculateExpectedFinishTime(hours,minutes,startHour,startMinutes)
           


            //Get the finish time from the document in order to compare it to the calculated finish time
            let finishTimeSetByWorker = document.getElementById('finishTimeSpan').innerText;


            //Calculate the number of hours and minutes in the day is set by the worker, the desired work day length
            const diffString = calculateDesiredWorkDayLength(startTime,finishTimeSetByWorker)

            //Check the hours that the worker has set and is hoping to work against the hours calculated by the routes and the jobs, if the calculated hours are greater than the hours set give the worker a warning
            checkExpectedDurationAgainstDesiredDurationAndGiveWarning(hours,minutes,diffString)

            setTheResultsInfoIntoTheOutputDivAndMakeItVisible(distance, durationString, finishTime)

            // remove the hide class from the LockItIn button
            showLockInButton()

            // Display the route on the map
            directionsDisplay.setDirections(result);

            let postcodeArrivalTimeObject = combineTwoArraysIntoAnObject(postcodes, postcodeArrivalTimes)
            console.log('postcodeArrivalTimeObject postcodeArrivalTimeObject postcodeArrivalTimeObject ', postcodeArrivalTimeObject)

            await addArrivalTimes(postcodeArrivalTimeObject)


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

function showLockInButton() {
    
    document.querySelector('#lockItIn').classList.remove('hide')
}

function createLengthsArray(lengthElements) {
    // Create an array to store the estimated job lengths
    const lengths = [];

    // Loop through the selected elements and extract the estimated job lengths
    for (let i = 0; i < lengthElements.length; i++) {

        // Get the text inside the <span> elemeint
        const text = lengthElements[i].innerText;

        // Extract the hours and minutes from the text
        const [hours, minutes] = [text.split(' ')[0], text.split(' ')[2]]

        // Get the checkbox element with the corresponding id
        const checkbox = lengthElements[i].previousElementSibling;

        // Check if the checkbox is checked
        if (checkbox.querySelector('input').checked) {
            // Add the hours and minutes to the array if the checkbox is checked
            lengths.push({ hours: Number(hours), minutes: Number(minutes) });
        };
    }
    return lengths
}

function createFormattedLengthsArray(lengthElements) {
    // Create an array to store the estimated job lengths
    const lengthsFormattedToHHMM = [];

    // Loop through the selected elements and extract the estimated job lengths
    for (let i = 0; i < lengthElements.length; i++) {

        // Get the text inside the <span> elemeint
        const text = lengthElements[i].innerText;

        // Extract the hours and minutes from the text
        const [hours, minutes] = [text.split(' ')[0], text.split(' ')[2]]

        // Get the checkbox element with the corresponding id
        const checkbox = lengthElements[i].previousElementSibling;

        // Check if the checkbox is checked
        if (checkbox.querySelector('input').checked) {
            // Add the hours and minutes to the array if the checkbox is checked
            lengthsFormattedToHHMM.push(`${hours}:${minutes}`)
        };
    }
    return lengthsFormattedToHHMM
}

function combineTwoArraysIntoAnObject(keys, values) {
    console.log('running combineTwoArraysIntoAnObject')
    // Make sure the arrays are the same length
    if (keys.length !== values.length) {
        return null;
    }

    // Create an empty object
    const result = {};

    // Loop through the keys and values and add them to the object
    for (let i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i];
    }

    // Return the resulting object
    return result;
}

async function addArrivalTimes(postcodeArrivalTimeObject) {
    try {
        const response = await fetch('jobs/addArrivalTimes', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                postcodeArrivalTimes: postcodeArrivalTimeObject
            })
            
        })
        const data = await response.json()
        console.log(data)

        } catch(err){
        console.log(err)
    }
}

function createPostcodesArray(postcodeElements) {
     // Create an array to store the postcodes
     const postcodes = [];

   
     // Loop through the selected elements and extract the postcodes
     for (let i = 0; i < postcodeElements.length; i++) {
         // Get the text inside the <span> element
         
         const text = postcodeElements[i].innerText;
 
         // Extract the postcode from the text (assumes the postcode is the second word in the text)
         const postcode = text.split(' ')[0];
 
         // Get the checkbox element with the corresponding id
         const checkbox = postcodeElements[i].previousElementSibling
 
 
         // Check if the checkbox is checked
         if (checkbox.checked) {
 
         // Add the postcode to the array if the checkbox is checked
             postcodes.push(postcode);
         }
     }

     return postcodes
 
}

function calculatePostcodeArrivalTimes(startTime, durationLegArray, lengthsFormattedToHHMM, postcodes) {
    //Calculate the arrival time at each address
    let postcodeArrivalTimes = [];
    let lastArrivalHour = '';
    let lastArrivalMinute = '';
    


    for(let i = 0; i < postcodes.length; i++) {
        if(i == 0) {

            //calculate the arrival time at the first job location
            let arrivalTimeHour = +startTime.split(':')[0] + +durationLegArray[i].split(':')[0]

            //calculate the arrival minute for the first location
            let arrivalTimeMinute = +startTime.split(':')[1] + +durationLegArray[i].split(':')[1]

            //Correct the time if minutes go over 60
            if(arrivalTimeMinute > 60) {
                while(arrivalTimeMinute > 60) {
                    arrivalTimeMinute -= 60
                    arrivalTimeHour += 1
                }
            }
            //if the time goes past midnight set it back
            if(arrivalTimeHour > 23) {
                arrivalTimeHour -= 24
            }
            //Add the correct formatting for display if the minute is less than 10
            if(arrivalTimeMinute < 10) {
                arrivalTimeMinute = '0' + arrivalTimeMinute
            }
            
            //add the correct formatting for display if the hour is less than 10
            if(arrivalTimeHour < 10) {
                arrivalTimeHour = '0' + arrivalTimeHour
            }

            lastArrivalHour = arrivalTimeHour
            lastArrivalMinute = arrivalTimeMinute
            postcodeArrivalTimes.push(`${arrivalTimeHour}:${arrivalTimeMinute}`)
        } else {
            // console.log('+lastArrivalHour ', +lastArrivalHour)
            // console.log("+lengthsFormattedToHHMM[i - 1].split(':')[0] ", +lengthsFormattedToHHMM[i - 1].split(':')[0])
            // console.log("durationLegArray[i].split(':')[0] ", durationLegArray[i].split(':')[0])
            let arrivalTimeHour = +lastArrivalHour + +lengthsFormattedToHHMM[i - 1].split(':')[0] + +durationLegArray[i].split(':')[0]

            let arrivalTimeMinute = +lastArrivalMinute + +lengthsFormattedToHHMM[i - 1].split(':')[1] + +durationLegArray[i].split(':')[1]

            //Correct the time if minutes go over 60
            if(arrivalTimeMinute > 60) {
                while(arrivalTimeMinute > 60) {
                    arrivalTimeMinute -= 60
                    arrivalTimeHour += 1
                }
            }
            //if the time goes past midnight set it back
            if(arrivalTimeHour > 23) {
                arrivalTimeHour -= 24
            }
            //Add the correct formatting for display if the minute is less than 10
            if(arrivalTimeMinute < 10) {
                arrivalTimeMinute = '0' + arrivalTimeMinute
            }
            
            //add the correct formatting for display if the hour is less than 10
            if(arrivalTimeHour < 10) {
                arrivalTimeHour = '0' + arrivalTimeHour
            }

            lastArrivalHour = arrivalTimeHour
            lastArrivalMinute = arrivalTimeMinute
            postcodeArrivalTimes.push(`${arrivalTimeHour}:${arrivalTimeMinute}`)

        }
    }

    return postcodeArrivalTimes
}

function calculateTimeWorked(lengths, duration) {
    // Declare the `hours` and `minutes` variables inside the callback function
    let hours = 0;
    let minutes = 0;

    // Create a Date object from the duration value
    const date = new Date(duration * 1000);

    // Get the number of hours and minutes from the Date object
    hours = date.getUTCHours();
    minutes = date.getUTCMinutes();   


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
    return [hours, minutes]
}

function calculateExpectedFinishTime(hours,minutes,startHour,startMinutes) {
    let finishHour = (+hours + +startHour) % 24
    let finishMinutes = (+minutes + + startMinutes)


    while (finishMinutes > 60) {
        finishMinutes -= 60
        finishHour += 1
    }

    if (finishMinutes < 10) {
        finishMinutes = '0' + finishMinutes
    }

    if (finishHour < 10) {
        finishHour = '0' + finishHour
    }
    
    
    const finishTime = finishHour + ':' + finishMinutes
    
    return finishTime
}

function calculateDesiredWorkDayLength(startTime,finishTimeSetByWorker) {
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
    return `${hourString}:${minuteString}`;
}

function checkExpectedDurationAgainstDesiredDurationAndGiveWarning(hours,minutes,diffString) {
    // Print the formatted difference between the two times
    let durationCheck = hours + ':' + minutes;



    //See if the hours of the day are greater than the estimated hours alert
    if (+durationCheck.split(':')[0] > +diffString.split(':')[0]) {

        document.querySelector('#finishTimeWarning').innerText = "With this many jobs you will be home later than you are aiming for, consider unchecking one or more jobs and calculating again"
        document.querySelector('.alert').classList.remove('hide');
    } else if (+durationCheck.split(':')[0] == +diffString.split(':')[0] && +durationCheck.split(':')[1] > +diffString.split(':')[1]) {

        document.querySelector('#finishTimeWarning').innerText = "With this many jobs you will be home later than you are aiming for, consider unchecking one or more jobs and calculating again"
        document.querySelector('.alert').classList.remove('hide');
    } else {
        document.querySelector('#finishTimeWarning').style.display = 'none'
        document.querySelector('.alert').classList.add('hide');
    }
    
}

function setTheResultsInfoIntoTheOutputDivAndMakeItVisible(distance, durationString, finishTime) {
    // Get the container holding the output element that is currently hidden
    const outputHolder = document.getElementById('outputHolder')

    //remove the hidden class from it
    outputHolder.classList.remove("hide");

    // Get the output element
    const output = document.querySelector('#output');

    //convert the distance to miles
    const distanceInMiles = Math.round(distance * 0.000621371)

   
    // Update the output with the total distance and duration
    output.innerHTML = "<div class='alert-info'><h3>Total distance: </h3><span>" + distanceInMiles + " miles.</span><h3>Total duration: </h3><span>" + durationString + ".</span><h3>Finish Time: </h3><span class='time'>" + finishTime + "</span></div>";
}

//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);