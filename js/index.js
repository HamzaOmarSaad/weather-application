var APIKey = "17a7047729d643d7beb122051252406";
var baseURL = "https://api.weatherapi.com/v1";

var mainCard = document.getElementById("card1");
var secondryCard = document.getElementById("card2");
var thirdCard = document.getElementById("card3");

var searchBar = document.querySelector("#search");
var searchButton = document.getElementById("findBtn");

var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var date = new Date();

async function getweather(place) {
    try {
        var data = await fetch(`${baseURL}/forecast.json?key=${APIKey}&days=3&q=${place}`);
        var response = await data.json();

        if (response.error) {
            alert("Location not found. Please try another city.");
            return;
        }

        mainCard.innerHTML = `
            <div class="card-header d-flex justify-content-between py-0">
                <h5>${days[date.getDay()]}</h5>
                <span>${date.getDate()} ${month[date.getMonth()]}</span>
            </div>
            <div class="card-body">
                <p>${response.location.name}</p>
                <h1 class="card-title" style="font-size: 5rem;">${response.current.temp_c} °C</h1>
                <img src="${response.current.condition.icon}" alt="">
                <p class="card-text type">${response.current.condition.text}</p>
            </div>
            <div class="icons row row-cols-3">
                <div class="col">
                    <img src="./assets/asset 2.png" alt="">
                    <span>${response.current.humidity}%</span>
                </div>
                <div class="col">
                    <img src="./assets/asset 3.png" alt="">
                    <span>${response.current.wind_kph} km/h</span>
                </div>
                <div class="col">
                    <img src="./assets/asset 4.png" alt="">
                    <span>${response.current.wind_dir}</span>
                </div>
            </div>
        `;

        secondryCard.innerHTML = `
            <h4 class="card-header text-center">${days[(date.getDay() + 1) % 7]}</h4>
            <div class="card-body">
                <img src="${response.forecast.forecastday[1].day.condition.icon}" alt="">
                <h3 class="card-title">${response.forecast.forecastday[1].day.maxtemp_c} °C</h3>
                <p class="card-text">${response.forecast.forecastday[1].day.mintemp_c} °</p>
                <p class="card-text type">${response.forecast.forecastday[1].day.condition.text}</p>
            </div>
        `;

        thirdCard.innerHTML = `
            <h4 class="card-header text-center">${days[(date.getDay() + 2) % 7]}</h4>
            <div class="card-body">
                <img src="${response.forecast.forecastday[2].day.condition.icon}" alt="">
                <h3 class="card-title">${response.forecast.forecastday[2].day.maxtemp_c} °C</h3>
                <p class="card-text">${response.forecast.forecastday[2].day.mintemp_c} °</p>
                <p class="card-text type">${response.forecast.forecastday[2].day.condition.text}</p>
            </div>
        `;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong while fetching weather data.");
    }
}

// Search button click
searchButton.addEventListener("click", function () {
    const city = searchBar.value.trim();
    if (city !== "") {
        getweather(city);
    }
});

// Pressing Enter in search input
searchBar.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        const city = searchBar.value.trim();
        if (city !== "") {
            getweather(city);
        }
    }
});

// Get user location and fetch weather
function getUserLocationAndCallWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getweather(`${lat},${lon}`);
            },
            function (error) {
                console.error("Error getting location:", error.message);
                alert("Could not access your location. Please enter a city manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Initial weather on page load
getUserLocationAndCallWeather();
