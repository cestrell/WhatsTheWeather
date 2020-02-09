let appId = '0614e71bacdb570b3553f3303c7d7214';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
        searchMethod = 'zip';
    } else {
        searchMethod = 'q';
    }
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`)
        .then(result => {
            return result.json();
        })
        .then(result => {
            init(result);
        })
}

function updateBackground(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("/static/images/Clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("/static/images/Clouds.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("/static/images/Rain.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("/static/images/Storm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("/static/images/Snow.jpg")';
            break;
        default:
            break;
    }
}


function init(resultFromServer) {
    updateBackground(resultFromServer);

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');
    let favicon = document.getElementById('favicon');

    iconURL = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
    weatherIcon.src = iconURL;
    favicon.href = iconURL;

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176'
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + Math.floor(resultFromServer.main.humidity) + '%'

    setPostionForWeatherInfo();
}


function setPostionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    let newTop = `calc(50% - ${weatherContainerHeight/4}px)`;
    let newLeft = `calc(50% - ${weatherContainerWidth/2}px)`;

    weatherContainer.style.top = newTop;
    weatherContainer.style.left = newLeft;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById("searchBtn").addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
})

setSearchPostion();