function dateTime() {
  let now = new Date();
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayMonth = now.getDate();
  let month = now.getMonth();
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
    "Dec",
  ];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let appDate = `${days[day]}, ${months[month]} ${dayMonth} ${hour}:${minutes}`;
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = appDate;
}
dateTime();

function cityName(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#city-search");
  let currentCity = document.querySelector("h1");
  if (cityDisplay.value) {
    currentCity.innerHTML = cityDisplay.value;
  } else {
    currentCity.innerHTML = null;
    alert("Please type a city");
    currentCity.innerHTML = "No City";
  }
}
let city = document.querySelector("#city-search");
city.addEventListener("submit", cityName);

function newCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  search(searchInput.value);
}

function search(city) {
  let apiKey = `bfe90b4de850696d7212ae4ecf5be048`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(currentWeather);
}

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", newCity);

function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let getCurrentWeather = document.querySelector("#currentCity");
getCurrentWeather.addEventListener("click", displayCurrentWeather);

function currentWeather(response) {
  let maintemp = document.querySelector("h3");
  maintemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let maincity = document.querySelector("h1");
  maincity.innerHTML = response.data.name;
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `bfe90b4de850696d7212ae4ecf5be048`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(currentWeather);
}
