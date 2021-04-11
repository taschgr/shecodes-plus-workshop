// Aktuelle Daten  //

let now = new Date();

let date = now.getDate();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let timeAndDate = document.querySelector("#date-and-time");
timeAndDate.innerHTML = `${date} ${month}, ${hour}:${minutes}`;

// Wetteranzeige //

function displayWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} MPH`;
  document.querySelector(
    "#precipitation"
  ).innerHTML = `${response.data.main.precipitation}`;
}

// Suche nach der Stadt //

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let unit = "metric";
  let apiKey = "13a5ce2ba808a0b9aced473a8bc0ef89";
  let apiSearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${unit}`;

  if (searchInput.value === 0) {
    alert("What city are you looking for?");
  }

  axios.get(apiSearchUrl).then(displayWeather);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", search);

// Aktueller Standort //

function handlePosition(position) {
  let unit = "metric";
  let apiKey = "13a5ce2ba808a0b9aced473a8bc0ef89";
  let apiLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiLocationUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locateButton = document.querySelector("#locate-button");
locateButton.addEventListener("click", getCurrentPosition);

// Aktuelle Stadt //

function defaultSearch(searchInput) {
  let unit = "metric";
  let defaultCity = "Zürich";
  let apiKey = "13a5ce2ba808a0b9aced473a8bc0ef89";
  let apiDefaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=${unit}`;
  document.querySelector("#city-name").innerHTML = `${defaultCity}`;

  axios.get(apiDefaultUrl).then(displayWeather);
}

// Celsius vs. Farenheit //

let temperature = document.querySelector("#temperature-value");
let fahrenheit = document.querySelector("#fahrenheit-link");
let celsius = document.querySelector("#celsius-link");

function changeToFahrenheit(event) {
  event.preventDefault();
  temperature.innerHTML = 48;
  fahrenheit.innerHTML = `| <strong>°F</strong>`;
  celsius.innerHTML = `°C `;
}

function changeToCelsius(event) {
  event.preventDefault();
  temperature.innerHTML = 9;
  fahrenheit.innerHTML = `| °F`;
  celsius.innerHTML = `<strong>°C</strong> `;
}

fahrenheit.addEventListener("click", changeToFahrenheit);
celsius.addEventListener("click", changeToCelsius);

defaultSearch("Zürich");
