var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { CityModel, WeatherModel } from './weather_model.js';
// background handle
const mainElement = document.getElementById("main-element");
const cloudBG = document.getElementById("cloud-bg");
const titleText = document.getElementById("title-text");
const getWeatherButton = document.getElementById("get-weather-button");
const currentHour = new Date().getHours();
console.log(currentHour);
if (currentHour >= 5 && currentHour < 16) {
    mainElement.classList.add("bg-[#C6FEFF]", "text-[#005C95]");
    titleText.innerHTML = `
    <span class="text-[#1A93DE]">Weather</span><span class="text-[#E7D531]">Wise</span>
    `;
    getWeatherButton.classList.add("bg-[#1A93DE]", "text-[#ffffff]");
}
else if (currentHour >= 16 && currentHour < 19) {
    mainElement.classList.add("bg-[#9E4631]", "text-[#000000]");
    cloudBG.classList.add("opacity-55");
    titleText.innerHTML = `
    <span class="text-[#522115]">Weather</span><span class="text-[#FFC98B]">Wise</span>
    `;
    getWeatherButton.classList.add("bg-[#522115]", "text-[#FFC98B]");
}
else {
    mainElement.classList.add("bg-[#241D2F]", "text-[#ffffff]");
    cloudBG.classList.add("opacity-25");
    titleText.innerHTML = `
    <span class="text-[#FFFFFF]">Weather</span><span class="text-[#CAE3FF]">Wise</span>
    `;
    getWeatherButton.classList.add("bg-[#CAE3FF]", "text-[#241D2F]");
}
const locationNameField = document.getElementById("search-location-field");
locationNameField.addEventListener('input', () => {
    fetchCityNames();
});
function fetchCityNames() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = locationNameField.value;
            if (query.length < 3) {
                cityNamesElement.innerHTML = '';
                (_a = document.getElementById("search-location-field-arrow")) === null || _a === void 0 ? void 0 : _a.classList.remove("rotate-180");
            }
            ;
            const apiKey = "884288e3bb90441e96270657250906";
            const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;
            const response = yield fetch(url);
            console.log(response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            let cityModels = [];
            data.map((dataJson) => {
                const cityModel = CityModel.fromJSON(dataJson);
                cityModels.push(cityModel);
            });
            (_b = document.getElementById("search-location-field-arrow")) === null || _b === void 0 ? void 0 : _b.classList.add("rotate-180");
            cityNamesElement.classList.remove("hidden");
            cityNamesElement.classList.add("block");
            handleDropDown(cityModels);
        }
        catch (error) {
            console.error("Error fetching city data:", error);
        }
    });
}
const cityNamesElement = document.getElementById('city-names');
function handleDropDown(cities) {
    cityNamesElement.innerHTML = '';
    cities.map((city) => {
        const cityName = document.createElement('p');
        cityName.classList.add("py-1", "px-5", "border-b", "border-b-gray-200", "hover:bg-gray-100");
        cityName.textContent = `${city.city}, ${city.region}`;
        cityName.addEventListener('click', () => {
            var _a;
            locationNameField.value = city.city;
            cityNamesElement.classList.remove("block");
            cityNamesElement.classList.add("hidden");
            (_a = document.getElementById("search-location-field-arrow")) === null || _a === void 0 ? void 0 : _a.classList.remove("rotate-180");
        });
        cityNamesElement.appendChild(cityName);
    });
}
function getWeather() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiKey = "884288e3bb90441e96270657250906";
            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationNameField.value}&aqi=no`;
            const response = yield fetch(url);
            console.log(response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            const weatherModel = WeatherModel.fromJSON(data);
            const cityNameElement = document.getElementById("city-name");
            const regionElement = document.getElementById("region");
            const temparature = document.getElementById("temparature");
            const weatherCondition = document.getElementById("weather-condition");
            console.log(weatherModel.cityModel.city);
            cityNameElement.textContent = weatherModel.cityModel.city;
            regionElement.textContent = `${weatherModel.cityModel.region}, ${weatherModel.cityModel.country}`;
            temparature.textContent = weatherModel.temp_c.toString();
            weatherCondition.textContent = weatherModel.condition_text;
            // show weather
            (_a = document.getElementById('weather-data')) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
            (_b = document.getElementById('weather-data')) === null || _b === void 0 ? void 0 : _b.classList.add("flex");
            // hide drop down
            cityNamesElement.classList.remove("block");
            cityNamesElement.classList.add("hidden");
        }
        catch (error) {
            console.error("Error fetching weather data:", error);
        }
    });
}
(_a = document.getElementById("get-weather-button")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', getWeather);
