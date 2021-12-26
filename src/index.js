function showWeather(response) {
  console.log(response);
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
}

function showPosition(position) {
  console.log(position);
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "imperial";
  let apiKey = "c9ea812441cd58019765e15b7f2eb11f";
  let apiEndpoint = "api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `https://${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getWeather(response) {
  let temperatureResult = document.querySelector("#temperature");
  temperatureResult.innerHTML = Math.round(response.data.main.temp);
  let humidityResult = document.querySelector("#humidity");
  humidityResult.innerHTML = Math.round(response.data.main.humidity);
  let windResult = document.querySelector("#wind");
  windResult.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = cityInput.value;
  let units = "imperial";
  let apiKey = "c9ea812441cd58019765e15b7f2eb11f";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeather);
}
function amPm() {
  let amPm = now.getHours();
  if (amPm <= 12) {
    return "am";
  } else {
    return "pm";
  }
}

function getCurrentDate(now) {
  let date = now.getDate();
  let currentDay = now.getDay();
  let month = now.getMonth();
  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentDay];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentMonth = months[month];

  return `${day}, ${currentMonth} ${date}, ${year}`;
}

function getCurrentTime(now) {
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = [
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11"
  ];

  let currentHour = hours[hour];
  return `${currentHour}:${minutes} ${amPm()}`;
}

function fahrenheitToCelsius(event) {
  event.preventDefault();
  //let temp = Number(temperature.innerHTML);
  temperature.innerHTML = 16;
}

function celsiusToFahrenheit(event) {
  event.preventDefault();
  //let temp = Number(temperature.innerHTML);
  temperature.innerHTML = 60;
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", searchCity);

let now = new Date();

let currentFullDate = document.querySelector("#current-date");
currentFullDate.innerHTML = getCurrentDate(now);

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = getCurrentTime(now);

let temperature = document.querySelector("#temperature");
let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");

celsiusLink.addEventListener("click", fahrenheitToCelsius);
fahrenheitLink.addEventListener("click", celsiusToFahrenheit);

navigator.geolocation.getCurrentPosition(showPosition);
