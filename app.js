const input = document.querySelector("input");
const button = document.querySelector("button");
const errorMessage = document.querySelector(".error");
const date = document.querySelector(".date");
const cityName = document.querySelector(".cityName");
const img = document.querySelector("img");
const temperatureDescription = document.querySelector(
  ".temperatureDescription"
);
const temperature = document.querySelector(".temperature");
const feelsTemperature = document.querySelector(".feelsTemperature");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");

const apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=e1b56b6b65e2550b6543eb1b4a5ee99b";
const apiUnit = "&units=metric";
const apiLang = "&lang=pl";

const checkWeather = () => {
  const apiCity = input.value;
  const URL = apiLink + apiCity + apiKey + apiUnit + apiLang;
  console.log(URL);

  axios
    .get(URL)
    .then((response) => {
      console.log(response.data);

      date.textContent = `${new Date().toString().slice(4, 21)}`;
      cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
      img.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
      temperatureDescription.textContent = `${response.data.weather[0].description}`;
      temperature.textContent = `${Math.floor(response.data.main.temp)} °C`;
      feelsTemperature.textContent = `${Math.floor(
        response.data.main.feels_like
      )} °C`;
      pressure.textContent = `${response.data.main.pressure} hPa`;
      humidity.textContent = `${response.data.main.humidity} %`;
      windSpeed.textContent = `${Math.floor(response.data.wind.speed)} m/s`;
      errorMessage.textContent = "";
    })
    .catch((error) => {
      if (error.response.data.cod === "404") {
        errorMessage.textContent = `Nie znaleziono miasta o nazwie ${input.value}`;
      }
      [
        cityName,
        temperature,
        feelsTemperature,
        temperatureDescription,
        pressure,
        humidity,
        windSpeed,
        date,
      ].forEach((el) => (el.textContent = ""));
      img.setAttribute("src", "");
    })
    .finally(() => {
      input.value = "";
    });
};
// Domyślnie wyświetlane miasto 
window.addEventListener("DOMContentLoaded", function () {
  input.defaultValue = "Warsaw";
  checkWeather();
});
// nasłuchiwanie kliknięcia przycisku lupy
button.addEventListener("click", checkWeather);
// nasłuchiwanie kliknięcia Enter
input.addEventListener("keypress", function (e) {
  if (e.key === 'Enter') {
    checkWeather();
  }
});
// Dodawanie ostatnich wyszukiwań
const output = document.getElementById("output");
button.addEventListener("click",addText);
input.addEventListener("keypress", function(e) {
  if (e.key === 'Enter') {
    addText();
  }
});
let addedText = [];

function addText() {
  const inputValue = input.value;
  addedText.push(inputValue);
  if (addedText.length > 8) {
    addedText.shift();
  }
  localStorage.setItem("addedText", JSON.stringify(addedText));
  output.innerHTML = addedText.join("<br>");
}

window.onload = function() {
  if (localStorage.getItem("addedText")) {
    addedText = JSON.parse(localStorage.getItem("addedText"));
    output.innerHTML = addedText.join("<br>");
  }
};