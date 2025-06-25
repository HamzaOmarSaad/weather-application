var APIKey ="17a7047729d643d7beb122051252406"
var baseURL="http://api.weatherapi.com/v1"
var mainCard=document.getElementById("card1")
var secondryCard=document.getElementById("card2")
var thirdCard=document.getElementById("card3")

var searchBar = document.querySelector("#search")
var searchButton=document.getElementById("findBtn")

var month=[ "jan","feb","mar","april","may","Jun","Jul","aug","sep","oct","nov","dec", ]
var days=["Sunday","Monday","Tueday","Wednsday","Thursday","Friday","Saturday",]

var date = new Date();

async function getweather(place){

    var data= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIKey}&days=3&q=${place}`)
    var response =  await data.json()
    mainCard.innerHTML=`
        <div class="card-header d-flex justify-content-between py-0">
            <h5>${days[date.getDay()]}</h5>
            <span> ${ date.getDate()} ${ month[date.getMonth()]}</span>
        </div>
        <div class="card-body">
            <p>${response.location.name}</p>
            <h1 class="card-title" style="font-size: 5rem;">${response.current.temp_c} °C</h1>
            <img src="${response.current.condition.icon}" alt="">
            <p class="card-text type">${response.current.condition.text}</p>
        </div>
        <div class="icons row row-cols-3 ">
            <div class="col ">
                <img src="./assets/asset 2.png" alt="">
                <span>${response.current.wind_kph}</span>
            </div>                                    
            <div class="col">
                <img src="./assets/asset 3.png" alt="">
                <span>${response.current.wind_kph}km/h</span>
            </div>                                    
            <div class="col">
                <img src="./assets/asset 4.png" alt="">
                <span>${response.current.wind_dir}</span>
            </div>
        </div>
    ` 
    
    secondryCard.innerHTML=`
    <h4 class="card-header text-center">${days[(date.getDay())+1]}</h4>
    <div class="card-body ">
        <img src="${response.forecast.forecastday[1].day.condition.icon}" alt="">
        <h3 class="card-title">${response.forecast.forecastday[1].day.maxtemp_c} °C</h3>
        <p class="card-text">${response.forecast.forecastday[1].day.mintemp_c} °</p>
        <p class="card-text type">${response.forecast.forecastday[1].day.condition.text}</p>
    </div>
    `    
    thirdCard.innerHTML=`
    <h4 class="card-header text-center">${days[(date.getDay())+2]}</h4>
    <div class="card-body ">
        <img src="${response.forecast.forecastday[2].day.condition.icon}" alt="">
        <h3 class="card-title">${response.forecast.forecastday[2].day.maxtemp_c} °C</h3>
        <p class="card-text">${response.forecast.forecastday[2].day.mintemp_c} °</p>
        <p class="card-text type">${response.forecast.forecastday[2].day.condition.text}</p>
    </div>
    `
}


searchButton.addEventListener("click",function(){
    getweather(searchBar.value)

})


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
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// Initial call to get location and weather
getUserLocationAndCallWeather();
