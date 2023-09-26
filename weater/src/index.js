function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  getTemperature(cityInput.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

let now = new Date();

let p = document.querySelector("p");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

p.innerHTML = `${day} ${hours}:${minutes}`;

function getTemperature(city) {
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(res) {
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${Math.round(res.data.main.temp)}`;
  let gen = document.querySelector("#general");
  gen.innerHTML = `humidity: ${res.data.main.humidity}% ; wind: ${Math.round(
    res.data.wind.speed
  )} km/h`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = res.data.name;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

getCurrentPosition();
let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);
