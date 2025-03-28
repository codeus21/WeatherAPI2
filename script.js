const weatherBox = document.getElementById('weatherBox');
const cityInput = document.getElementById('cityInput');
const submitButton = document.getElementById('submitButton');
const inputForm = document.getElementById('inputForm')
const apiKey = "fbf7cb72862cfcf4f9951be617a30db1";

inputForm.addEventListener('submit', function(event) {
    event.preventDefault();
});

async function getWeather(){
    if(cityInput.value){
        try{
            const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`);

            console.log(response);

            if(!response.ok){
                console.error("Couldn't fetch data.");
            }

            const data = await response.json();
            console.log(data);

            const {name: city, 
                main: {temp, humidity}, 
                wind: {speed},
                weather: [{description}]
            } = data;

            weatherBox.textContent = "";
            weatherBox.style.display = "block";

            const cityTitle = document.createElement("h1");
            cityTitle.textContent = city;
            weatherBox.appendChild(cityTitle);

            const tempinFahr = document.createElement("h1");
            tempinFahr.textContent = temp.toFixed(0) + "°";
            weatherBox.appendChild(tempinFahr);

            const humidityLevel = document.createElement('h3');
            humidityLevel.textContent = "Humidity: " + humidity + "%";
            weatherBox.appendChild(humidityLevel);

            const windspeed = document.createElement('h3');
            windspeed.textContent = "Winds: " + speed.toFixed(0) + "mph";
            weatherBox.appendChild(windspeed);
            
            const desc = document.createElement('h3');
            desc.textContent = description;
            weatherBox.appendChild(desc);
            }
        catch(error){
            console.error(error);
        }
    }
    else {
        console.error("No value was entered.");
        weatherBox.textContent = "";
        weatherBox.style.display = "block";
        const errormessage = document.createElement('h1');
        errormessage.textContent = "Please enter a city."
        weatherBox.appendChild(errormessage);
        
    }
}