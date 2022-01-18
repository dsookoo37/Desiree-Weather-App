function rainyWeather() {
  appBackground.classList.add("rainBackground");
  searchCityButton.classList.add("rainBoxAndSeachCityButtonTheme");
  cityBox.classList.add("rainBoxAndSeachCityButtonTheme");
  dayOne.classList.add("rainBoxAndSeachCityButtonTheme");
  dayTwo.classList.add("rainBoxAndSeachCityButtonTheme");
  dayThree.classList.add("rainBoxAndSeachCityButtonTheme");
  dayFour.classList.add("rainBoxAndSeachCityButtonTheme");
  dayFive.classList.add("rainBoxAndSeachCityButtonTheme");
}
function thunderstormWeather() {
  appBackground.classList.add("thunderstormBackground");
  searchCityButton.classList.add("thunderstormBoxTheme");
  dateLine.classList.add("thunderstormTimeAndDateTheme");
  timeLine.classList.add("thunderstormTimeAndDateTheme");
  cityBox.classList.add("thunderstormBoxTheme");
  dayOne.classList.add("thunderstormBoxTheme");
  dayTwo.classList.add("thunderstormBoxTheme");
  dayThree.classList.add("thunderstormBoxTheme");
  dayFour.classList.add("thunderstormBoxTheme");
  dayFive.classList.add("thunderstormBoxTheme");
}
function snowyWeather() {
  appBackground.classList.add("snowBackground");
  searchCityButton.classList.add("snowBoxAndSearchCityButtonTheme");
  cityBox.classList.add("snowBoxAndSearchCityButtonTheme");
  dayOne.classList.add("snowBoxAndSearchCityButtonTheme");
  dayTwo.classList.add("snowBoxAndSearchCityButtonTheme");
  dayThree.classList.add("snowBoxAndSearchCityButtonTheme");
  dayFour.classList.add("snowBoxAndSearchCityButtonTheme");
  dayFive.classList.add("snowBoxAndSearchCityButtonTheme");
}
function mistyWeather() {
  appBackground.classList.add("mistBackground");
  searchCityButton.classList.add("mistSearchCity");
  cityBox.classList.add("cityDetailsContainer");
}

function cloudyWeather() {
  appBackground.classList.add("cloudySkyBackground");
  searchCityButton.classList.add("cloudySkySearchCity");
  dateLine.classList.add("cloudySkyTimeAndDate");
  timeLine.classList.add("cloudySkyTimeAndDate");
  cityBox.classList.add("cloudySkyTheme");
  dayOne.classList.add("cloudySkyTheme");
  dayTwo.classList.add("cloudySkyTheme");
  dayThree.classList.add("cloudySkyTheme");
  dayFour.classList.add("cloudySkyTheme");
  dayFive.classList.add("cloudySkyTheme");
}

function changeWeatherTheme(response) {
  appBackground.classList =
    "card weather-app-container defaultWeatherBackground";
  searchCityButton.classList = "searchCityButton";
  timeLine.classList = "time";
  cityBox.classList = "cityDetailsContainer";
  dateLine.classList = "date";
  dayOne.classList = "col daycontainer";
  dayTwo.classList = "col daycontainer";
  dayThree.classList = "col daycontainer";
  dayFour.classList = "col daycontainer";
  dayFive.classList = "col daycontainer";

  if (
    response.data.weather[0].main === "Drizzle" ||
    response.data.weather[0].main === "Rain"
  ) {
    rainyWeather();
  } else if (response.data.weather[0].main === "Thunderstorm") {
    thunderstormWeather();
  } else if (response.data.weather[0].main === "Snow") {
    snowyWeather();
  } else if (response.data.weather[0].main === "Mist") {
    mistyWeather();
  } else if (response.data.weather[0].main === "Clouds") {
    cloudyWeather();
  } else {
    appBackground.classList.add("defaultWeatherBackground");
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

let searchCityButton = document.querySelector("#search-city-button");
let dateLine = document.querySelector("#current-date");
let timeLine = document.querySelector("#time");
let cityBox = document.querySelector("#city-details-box");
let dayOne = document.querySelector("#day-one");
let dayTwo = document.querySelector("#day-two");
let dayThree = document.querySelector("#day-three");
let dayFour = document.querySelector("#day-four");
let dayFive = document.querySelector("#day-five");
let appBackground = document.querySelector("#weather-app-container");

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

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", searchCity);

navigator.geolocation.getCurrentPosition(showPosition);
