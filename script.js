/* Name: Rachel Myers
* Class: CIS 131
* Section: W01
* Date: 12/11/2020
*/

//Global variables
//Get value of the zip code field
var zip;

//Variable for the XMLHttpRequest
var httpRequest = new XMLHttpRequest();

//Div that displays current weather
var currentWeather = document.getElementById("currentWeather");

//Span that displays the city
var city = document.getElementById("city");

//Variables for the Celsius and Fahrenheit radio buttons
var f = document.getElementById("f");
var c = document.getElementById("c");
var unitSymbol;

//Event listener for the Get Weather button
document.getElementById("btGetWeather").addEventListener("click", getWeather);

//Function that's called for the event listener for the Get Weather function
function getWeather() 
{
    //Get zip code value
    zip = document.getElementById("zip").value;

    //Determine if the user input for the zip code is valid
    var isValid = validateInput();

    //Do API call if zip code value is valid
    if(isValid)
    {
        //Get the unit selected by the user
        var unit = getUnits();
        
        //Send a get request to get current weather for the specified zip code and unit
        httpRequest.open("get", "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",US&units=" + unit + [your API key goes here]);

        //Send the request
        httpRequest.send();

        //When the request status changes, call the showState method
        httpRequest.onreadystatechange = showState;
        
    }
}

//Check if the zip code field value is valid
function validateInput() {  

    //Pattern of five digits
    var zipPattern = /\d{5}/;

    //If zip code is blank, display error message and return false
    if(zip == "")
    {
        alert("Please enter a zip code");
        return false;
    }

    //If zip is not blank and does not match five-digit pattern, display error message and return false
    else if(zip != "" && zipPattern.test(zip) == false) 
    {
        alert("Zip code must be a 5-digit value (i.e., 65802)");
        return false;
    }

    //If a radio button isn't selected, displaye error message and return false
    else if(f.checked == false && c.checked == false)
    {
        alert("Please select Celsius or Fahrenheit");
        return false;
    }

    //Return true if other conditions are false/passed
    else 
    {
        return true;
    }
}

//This function returns which radio button was selected
function getUnits() 
{
    //If Celsius is checked, update the unitSymbol and return "imperial"
    if(f.checked == true)
    {
        unitSymbol = "&#8457";
        return "imperial";
    }

    //If Fahrenheit is checked, update the unitSymbol and return "metric"
    else if(c.checked == true)
    {
        unitSymbol = "&#8451";
        return "metric";
    }
}


//This method is called when the request status has changed
function showState() {
    //If the request was sent and has a successful status, execute the following code
    if(httpRequest.readyState == 4 && httpRequest.status == 200) {
        //Weather icon
        var icon = document.getElementById("icon");

        //Store the JSON response text in a variable
        var weather = httpRequest.responseText;

        //Parse the JSON response string into an object in order to read its properties
        weatherObj = JSON.parse(weather);

        //Display the date of the next launch from the first object in the launches array
        city.innerHTML = weatherObj.name + ":";

        //Display the current temperature
        document.getElementById("temperature").innerHTML = "Current Temperature: " + weatherObj.main.temp +
            unitSymbol;

        //Display the icon   
        icon.src = "http://openweathermap.org/img/wn/" + weatherObj.weather[0].icon + ".png";

        //Display the weather description
        document.getElementById("currentConditions").innerHTML = weatherObj.weather[0].description;
        
        //Display the currentWeather div
        currentWeather.style.display = "block";
        
    } else {
        console.log("Error retrieving data from API call");
    }
}

