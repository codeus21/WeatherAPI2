const weatherBox = document.getElementById('weatherBox');
const cityInput = document.getElementById('cityInput');
const submitButton = document.getElementById('submitButton');
const inputForm = document.getElementById('inputForm')
const apiKey = "fbf7cb72862cfcf4f9951be617a30db1";

inputForm.addEventListener('submit', function(event) {
    event.preventDefault();
    getWeather();
});

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather(){
    if(cityInput.value){
        try{
            const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`);

            if(!response.ok){
                console.error("Couldn't fetch data.");
            }

            const data = response.json();
            console.log(data);
    
            weatherBox.display = "block";
            }
        catch(error){
            console.error(error);
        }
    }
    else {
        console.error("Please enter a city.");
    }
}