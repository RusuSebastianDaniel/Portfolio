// card page and animation section

const weatherCardPage = document.querySelector(`.weather-card-page`);
const weatherOpenButton = document.querySelector(`.weather-open-btn`);
const weaTherIcon = document.querySelector(`.fa-cloud`);
const weatherSection = document.querySelector('.weather-card-section');
const weatherCardCoords = weatherCardPage.getBoundingClientRect();
const weatherCardPageMiddleX = weatherCardCoords.x + weatherCardCoords.width / 0.5
const weatherCardPageMiddleY = weatherCardCoords.y + weatherCardCoords.height / 2;
const extendedContent = createElem('div', null, 'extended-content');
extendedContent.append(initialContent());

const weatherCardOffsetX= weatherCardPageMiddleX / 0.8
const weatherCardOffsetY = weatherCardPageMiddleY / 0.8;


weatherOpenButton.addEventListener(`click`, () => {
    weatherCardPage.classList.toggle(`expanded`)
    weatherCardPage.classList.toggle(`weather-card-page`)
    weatherOpenButton.textContent = weatherCardPage.classList.contains(`expanded`) ? `Close` : `Open`;
    weatherCardPage.classList.contains(`expanded`) ? weatherCardPage.append(extendedContent) : weatherCardPage.removeChild(extendedContent);
    addEventListenerToSearch();
    weaTherIcon.classList.toggle(`fa-cloud`);
});
    // animation for the weather card
weatherSection.addEventListener("mousemove", (e) => {
    e.stopImmediatePropagation()
    rotateElement(e, weatherCardPage, weatherCardOffsetX, weatherCardOffsetY);
});
// logic
const keyApi = `d3b71d828c5a563d9a6a99467efeb544`;
let cityInput
let searchButton 
let extendedContentDiv
async function getCityCoordinates() {
    cityInput = document.querySelector(`.city-input`);
    const cityName = cityInput.value.trim(); //input
    if (!cityName) return;
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${keyApi}`;
    await fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            
        if (!data.length) return alert(`no coordinates found for ${cityName}`); //error
            const { lat, lon } = data[0]; // array distructuring 
        getWeatherDetail( lat, lon );
    }).catch((error) => {
        alert(`error, please try again`);
        console.error(error)
    });


}
function addEventListenerToSearch() {
    if (weatherCardPage.classList.contains(`expanded`)) {
    searchButton = document.querySelector(`.get-weather-btn`);
    searchButton.addEventListener(`click`, getCityCoordinates);
    }
}

async function getWeatherDetail(lat, lon )  {
    const WeatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keyApi}`;
//fetch data
    await fetch(WeatherApi)
        .then(res => res.json())
        .then(data => {
        const uniqueForecastDays = [];
        const fourDaysForecast = data.list.filter(forecast => {

            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        extendedContentDiv = document.querySelector('.extended-content');
        fourDaysForecast.forEach((weatherItem,index) => {
            extendedContentDiv.append(createWeatherCard(weatherItem, index))
        });
    }).catch((error) => {
        alert(`error, please try again`);
        console.error(error);
    });
}


const createWeatherCard = (weatherItem, index) => {
    
    const img = createImg(`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png`, `weathericon.png`); 
    const curentWeatherCarImg = createImg(`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png`, `weathericon.png`);
    const listItem = createElem("li", "", "weather-card");
    const date = createElem("h4", weatherItem.dt_txt.split(" ")[0], "date");
    const temp = createElem("h6", `${(weatherItem.main.temp - 273.15).toFixed(2)}°C`, "temp");
    const wind = createElem("h6", `${weatherItem.wind.speed} M/S`, "wind");
    const humidity = createElem("h6", `${weatherItem.main.humidity}%`, "humidity");
    const weatherCardDiv = createElem('div',null, 'weather-card' + index)
    const detailsDiv = createElem('div', null, 'details');
    const h4 = createElem('h4', weatherItem.dt_txt.split(' ')[0], 'date');
    const temperatureH6 = createElem('h6', `${(weatherItem.main.temp - 273.15).toFixed(2)}°C`, 'temp');
    const windH6 = createElem('h6', `${weatherItem.wind.speed} M/S`, 'wind');
    const humidityH6 = createElem('h6', `${weatherItem.main.humidity}%`, 'humidity'); 
    const iconDiv = createElem('div', null, 'icon');
    const iconDescriptionH6 = createElem('h6', weatherItem.weather[0].description, 'icon-description');


    listItem.append(date);
    listItem.append(temp);
    listItem.append(wind);
    listItem.append(humidity);
    listItem.append(img);
    iconDiv.appendChild(iconDescriptionH6);
    iconDiv.appendChild(curentWeatherCarImg);
    detailsDiv.appendChild(temperatureH6);
    detailsDiv.appendChild(h4);
    detailsDiv.appendChild(windH6);
    detailsDiv.appendChild(humidityH6);
    weatherCardDiv.append(detailsDiv);
    weatherCardDiv.append(iconDiv);
    return weatherCardDiv;
};

function initialContent() {
    const initialContent = createElem('div', null, 'initial-content');
    const h1 = createElem('h1', 'Weather App', 'weather-title');
    const p = createElem('p', 'Enter a city', 'description');
    const cityInput = createElem('input', null, 'city-input');
    cityInput.type = 'text';
    const button = createElem('button', 'Get Weather', 'get-weather-btn');
    initialContent.append(h1);
    initialContent.append(p);
    initialContent.append(cityInput);
    initialContent.append(button);
    return initialContent;
}


function createElem(Elem, text, className) {
    const elem = document.createElement(Elem);
    elem.textContent = text;
    elem.classList.add(className);
    return elem;
}

function createImg(src, alt) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    return img;
}