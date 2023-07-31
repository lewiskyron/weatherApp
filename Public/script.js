const weatherDisplay = document.getElementById('weatherDisplay');
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const locationsList = document.getElementById('locationsList');
const saveButton = document.getElementById('s_button')
const buttonContainer = document.getElementById('buttonDisplay')
let savedLocations = [];

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  getWeather(city);
  
});


saveButton.addEventListener('click', () => {
  alert('Location Saved!')
  updateSavedLocations() 
});

  

async function getWeather(city) {
    try {
      const apiUrl = `http://localhost:3000/api/${city}`;
     
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.cod === '404') {
        alert('City not found. Please check the city and country code.');
        return;
      }
  
      const weatherInfo = `
      <div class = "image"> 
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" class="weather-icon" alt="Weather Icon" width="100" height="100" >
      </div>

      <div class = 'text'>
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
      </div>
       
      `;
  
      weatherDisplay.innerHTML = weatherInfo;

  } catch (error) {
    console.error('Error in script.js', error);
    alert('An error occurred while fetching weather data.');
  }
}

// function updateSavedLocations() {
//   locationsList.innerHTML = '';
//   savedLocations.forEach((loc) => {
//     const listItem = document.createElement('li');
//     listItem.textContent = `${loc.city}, ${loc.country}`;
//     getWeather(loc.city)
//     locationsList.appendChild(listItem);
//   });
// }
// ... Your existing code ...

