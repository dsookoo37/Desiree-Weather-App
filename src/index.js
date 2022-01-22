function rainyWeather() {
  appBackground.classList.remove(currentTheme);
  currentTheme = "rainBackground";
  appBackground.classList.add(currentTheme);
}
function thunderstormWeather() {
  appBackground.classList.remove(currentTheme);
  currentTheme = "thunderstormBackground";
  appBackground.classList.add(currentTheme);
}
function snowyWeather() {
  appBackground.classList.remove(currentTheme);
  currentTheme = "snowBackground";
  appBackground.classList.add(currentTheme);
}

function mistyWeather() {
  appBackground.classList.remove(currentTheme);
  currentTheme = "mistBackground";
  appBackground.classList.add(currentTheme);
}

function cloudyWeather() {
  appBackground.classList.remove(currentTheme);
  currentTheme = "cloudySkyBackground";
  appBackground.classList.add(currentTheme);
}
function defaultBackground() {
  appBackground.classList.remove(currentTheme);
  currentTheme = "defaultWeatherBackground";
  appBackground.classList.add(currentTheme);
}
function changeWeatherTheme(response) {
  let currentDescription = response.data.weather[0].main;

  if (currentDescription === "Drizzle" || currentDescription === "Rain") {
    rainyWeather();
  } else if (currentDescription === "Thunderstorm") {
    thunderstormWeather();
  } else if (currentDescription === "Snow") {
    snowyWeather();
  } else if (currentDescription === "Mist") {
    mistyWeather();
  } else if (currentDescription === "Clouds") {
    cloudyWeather();
  } else {
    defaultBackground();
  }
}

function parseResponse(response) {
  let weather = {
    cityName: response.data.name,
    temperature: Math.round(response.data.main.temp),
    description: response.data.weather[0].description,
    humidity: Math.round(response.data.main.humidity),
    wind: Math.round(response.data.wind.speed),
    icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  };
  fahrenheitTemperature = response.data.main.temp;
  return weather;
}

function setWeather(weather) {
  document.querySelector("h1").innerHTML = weather.cityName;
  document.querySelector("#temperature").innerHTML = weather.temperature;
  document.querySelector("#humidity").innerHTML = weather.humidity;
  document.querySelector("#wind").innerHTML = weather.wind;
  document.querySelector("#weather-description").innerHTML =
    weather.description;
  document.querySelector("#weather-icon").setAttribute("src", weather.icon);
}

function handleWeather(response) {
  console.log(parseResponse(response));
  let weather = parseResponse(response);
  setWeather(weather);
  changeWeatherTheme(response);
}

function showPosition(position) {
  //console.log(position);
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "imperial";
  let apiKey = "c9ea812441cd58019765e15b7f2eb11f";
  let apiEndpoint = "api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `https://${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(handleWeather);
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
  axios.get(apiUrl).then(handleWeather);
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
    "Saturday",
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
    "December",
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
    "11",
  ];

  let currentHour = hours[hour];
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  return `${currentHour}:${minutes} ${amPm()}`;
}

function fahrenheitToCelsius(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheitTemperature - 32) * 5) / 9;
  celsiusTemp = Math.round(celsiusTemp);
  temperature.innerHTML = celsiusTemp;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function celsiusToFahrenheit(event) {
  event.preventDefault();
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  console.log(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let fahrenheitTemperature = null;

let currentTheme = null;

let appBackground = document.querySelector(".weather-app-container");

let now = new Date();

let currentFullDate = document.querySelector(".date");
currentFullDate.innerHTML = getCurrentDate(now);

let currentTime = document.querySelector(".time");
currentTime.innerHTML = getCurrentTime(now);

let temperature = document.querySelector("#temperature");
let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");

celsiusLink.addEventListener("click", fahrenheitToCelsius);
fahrenheitLink.addEventListener("click", celsiusToFahrenheit);

let form = document.querySelector(".city-search-form");
form.addEventListener("submit", searchCity);

navigator.geolocation.getCurrentPosition(showPosition);
