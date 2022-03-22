function rainyWeather() {
  appBackground.classList.remove(currentWeatherTheme);
  currentWeatherTheme = "rainBackground";
  appBackground.classList.add(currentWeatherTheme);
}
function thunderstormWeather() {
  appBackground.classList.remove(currentWeatherTheme);
  currentWeatherTheme = "thunderstormBackground";
  appBackground.classList.add(currentWeatherTheme);
}
function snowyWeather() {
  appBackground.classList.remove(currentWeatherTheme);
  currentWeatherTheme = "snowBackground";
  appBackground.classList.add(currentWeatherTheme);
}

function mistyWeather() {
  appBackground.classList.remove(currentWeatherTheme);
  currentWeatherTheme = "mistBackground";
  appBackground.classList.add(currentWeatherTheme);
}

function cloudyWeather() {
  appBackground.classList.remove(currentWeatherTheme);
  currentWeatherTheme = "cloudySkyBackground";
  appBackground.classList.add(currentWeatherTheme);
}
function defaultBackground() {
  appBackground.classList.remove(currentWeatherTheme);
  currentWeatherTheme = "defaultWeatherBackground";
  appBackground.classList.add(currentWeatherTheme);
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
    defaultWeatherBackground();
  }
}

function getApiKey() {
  return "c9ea812441cd58019765e15b7f2eb11f";
}

function getApiUnits() {
  return "imperial";
}

function getForecast(coordinates) {
  let exclude = "current,minutely,hourly,alerts";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${
    coordinates.lat
  }&lon=${
    coordinates.lon
  }&exclude=${exclude}&appid=${getApiKey()}&units=${getApiUnits()}`;
  axios.get(apiUrl).then(displayForecast);
}

function parseResponse(response) {
  let weather = {
    cityName: response.data.name,
    temperature: Math.round(response.data.main.temp),
    description: response.data.weather[0].description,
    humidity: Math.round(response.data.main.humidity),
    wind: Math.round(response.data.wind.speed),
    icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  };

  getForecast(response.data.coord);
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
  let weather = parseResponse(response);
  setWeather(weather);
  changeWeatherTheme(response);
}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${getApiKey()}&units=${getApiUnits()}`;
  axios.get(apiUrl).then(handleWeather);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = cityInput.value;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${
    cityInput.value
  }&appid=${getApiKey()}&units=${getApiUnits()}`;
  axios.get(apiUrl).then(handleWeather);
}

function amPm() {
  let amPm = now.getHours();
  if (amPm < 12) {
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let iconNumber = 0;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row allDays">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<div class="col daycontainer">
							<strong> ${formatDay(forecastDay.dt)} </strong> 
							</br>
              <img src="https://openweathermap.org/img/wn/${
                forecast[iconNumber].weather[0].icon
              }@2x.png" alt="" width = "25"/>
								</br>
							<span> 
								${Math.round(forecastDay.temp.max)}°/${Math.round(forecastDay.temp.min)}°
							</span> 
						</div>
						`;
      iconNumber += 1;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayCurrentDate() {
  let currentFullDate = document.querySelector(".date");
  currentFullDate.innerHTML = getCurrentDate(now);
}

function displayCurrentTime() {
  let currentTime = document.querySelector(".time");
  currentTime.innerHTML = getCurrentTime(now);
}

let currentWeatherTheme = null;

let appBackground = document.querySelector(".weather-app-container");

let now = new Date();

let temperature = document.querySelector("#temperature");

let form = document.querySelector(".city-search-form");
form.addEventListener("submit", searchCity);

navigator.geolocation.getCurrentPosition(showPosition);

displayCurrentTime();
displayCurrentDate();
displayForecast();
