let city; // to be able to access in the displayData method

async function getWeather() {
    city = document.getElementById('mycity').value;
    let key = 'd72729578543cfc435344f99b226b1c9';
    let wurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    try {
        let response = await fetch(wurl);
        let data = await response.json();
        displayData(data);
    } catch (error) {
        console.log("An error occurred while fetching data, please check city name again");
        document.getElementById('mydiv').innerHTML = "<span class='text-danger'> An error occurred while fetching data, please check city name again </span>";
    }
}

function displayData(data) {
    console.log(data);
    let currentTempCelsius = Math.round(data.main['temp']);
    let minTempCelsius = Math.round(data.main['temp_min']);
    let maxTempCelsius = Math.round(data.main['temp_max']);
    let windSpeedMetersPerSec = data.wind.speed;
    let weatherActual = data.weather[0].main;
    let imgicon = data.weather[0].icon;

    const currentTempFahrenheit = Math.round((currentTempCelsius * 9 / 5) + 32);
    const minTempFahrenheit = Math.round((minTempCelsius * 9 / 5) + 32);
    const maxTempFahrenheit = Math.round((maxTempCelsius * 9 / 5) + 32);

    const windSpeedMph = Math.round(windSpeedMetersPerSec * 2.237);

    document.getElementById('mydiv').innerHTML = `
        <h4>Weather in ${city} is ${weatherActual}</h4><br>
        Current temp is ${currentTempCelsius}°C (${currentTempFahrenheit}°F).<br>
        Max Temp is ${maxTempCelsius}°C (${maxTempFahrenheit}°F).<br>
        Min Temp is ${minTempCelsius}°C (${minTempFahrenheit}°F).<br>
        Wind Speed is ${windSpeedMetersPerSec.toFixed(2)} m/s (${windSpeedMph} mph).<br>
        <img src='http://openweathermap.org/img/w/${imgicon}.png' alt='Weather icon' />
    `;
}
