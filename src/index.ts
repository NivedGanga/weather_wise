import { CityModel, WeatherModel } from './weather_model.js'
// background handle
const mainElement = document.getElementById("main-element") as HTMLElement
const cloudBG = document.getElementById("cloud-bg") as HTMLElement
const titleText = document.getElementById("title-text") as HTMLElement
const getWeatherButton = document.getElementById("get-weather-button") as HTMLElement
const currentHour = new Date().getHours();
console.log(currentHour)
if (currentHour >= 5 && currentHour < 16) {
    mainElement.classList.add("bg-[#C6FEFF]", "text-[#005C95]");
    titleText.innerHTML = `
    <span class="text-[#1A93DE]">Weather</span><span class="text-[#E7D531]">Wise</span>
    `
    getWeatherButton.classList.add("bg-[#1A93DE]", "text-[#ffffff]")
} else if (currentHour >= 16 && currentHour < 19) {
    mainElement.classList.add("bg-[#9E4631]", "text-[#000000]");
    cloudBG.classList.add("opacity-55")
    titleText.innerHTML = `
    <span class="text-[#522115]">Weather</span><span class="text-[#FFC98B]">Wise</span>
    `
    getWeatherButton.classList.add("bg-[#522115]", "text-[#FFC98B]")
} else {
    mainElement.classList.add("bg-[#241D2F]", "text-[#ffffff]");
    cloudBG.classList.add("opacity-25")
    titleText.innerHTML = `
    <span class="text-[#FFFFFF]">Weather</span><span class="text-[#CAE3FF]">Wise</span>
    `
    getWeatherButton.classList.add("bg-[#CAE3FF]", "text-[#241D2F]")
}
const locationNameField = document.getElementById("search-location-field") as HTMLInputElement
locationNameField.addEventListener('input', () => {
    fetchCityNames();
});

async function fetchCityNames() {
    try {
        const query = locationNameField.value;
        if (query.length < 3) {
            cityNamesElement.innerHTML = ''
            document.getElementById("search-location-field-arrow")?.classList.remove("rotate-180")
        };

        const apiKey = "884288e3bb90441e96270657250906";
        const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

        const response = await fetch(url);
        console.log(response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        let cityModels: CityModel[] = [];
        data.map((dataJson: any) => {
            const cityModel: CityModel = CityModel.fromJSON(dataJson);
            cityModels.push(cityModel)
        })
        document.getElementById("search-location-field-arrow")?.classList.add("rotate-180")
        cityNamesElement.classList.remove("hidden")
        cityNamesElement.classList.add("block")
        handleDropDown(cityModels)
    } catch (error) {
        console.error("Error fetching city data:", error);
    }
}
const cityNamesElement = document.getElementById('city-names') as HTMLElement
function handleDropDown(cities: Array<CityModel>) {
    cityNamesElement.innerHTML = ''
    cities.map((city) => {
        const cityName = document.createElement('p')
        cityName.classList.add("py-1", "px-5", "border-b", "border-b-gray-200", "hover:bg-gray-100")
        cityName.textContent = `${city.city}, ${city.region}`
        cityName.addEventListener('click', () => {
            locationNameField.value = city.city
            cityNamesElement.classList.remove("block")
            cityNamesElement.classList.add("hidden")
            document.getElementById("search-location-field-arrow")?.classList.remove("rotate-180")
        })
        cityNamesElement.appendChild(cityName)
    })
}

async function getWeather() {
    try {
        const apiKey = "884288e3bb90441e96270657250906";
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationNameField.value}&aqi=no`;
        const response = await fetch(url);
        console.log(response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const weatherModel = WeatherModel.fromJSON(data)
        const cityNameElement = document.getElementById("city-name") as HTMLElement
        const regionElement = document.getElementById("region") as HTMLElement
        const temparature = document.getElementById("temparature") as HTMLElement
        const weatherCondition = document.getElementById("weather-condition") as HTMLElement
        console.log(weatherModel.cityModel.city)
        cityNameElement.textContent = weatherModel.cityModel.city
        regionElement.textContent = `${weatherModel.cityModel.region}, ${weatherModel.cityModel.country}`
        temparature.textContent = weatherModel.temp_c.toString()
        weatherCondition.textContent = weatherModel.condition_text
        // show weather
        document.getElementById('weather-data')?.classList.remove("hidden")
        document.getElementById('weather-data')?.classList.add("flex")
        // hide drop down
        cityNamesElement.classList.remove("block")
        cityNamesElement.classList.add("hidden")
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
document.getElementById("get-weather-button")?.addEventListener('click', getWeather)