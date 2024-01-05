const apiKey = "6e0bd381460dae0244d418cfe6adca05";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const searchCity = document.querySelector("#search-city-list")
let localStorageCityList = [];

function getCityFromLocalStorage(){
  localStorageCityList = JSON.parse(localStorage.getItem('searchCity')) || [];
  console.log('Inside func localStorageCityList', localStorageCityList)

  for (let i = 0; i < localStorageCityList.length; i++) {
    console.log(localStorageCityList[i]);
    const newLi = document.createElement("li");
    newLi.innerHTML = localStorageCityList[i];
    searchCity.append(newLi);
    
}

}

console.log('localStorageCityList', localStorageCityList)

async function checkWeather(city){
    console.log('checkWeahterlocalStorageCityList', localStorageCityList)
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    console.log('city', city);
    console.log(searchCity)
    const newLi = document.createElement("li");
    newLi.innerHTML = city
    searchCity.append(newLi);
    localStorageCityList.push(city)
    localStorage.setItem("searchCity", JSON.stringify(localStorageCityList));
    console.log('Saved ==== localStorageCityList', localStorageCityList);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°c';
    document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
    document.querySelector(".wind").innerHTML = data.wind.speed + 'km/h';


    if(data.weather[0].main == 'Clouds'){
        weatherIcon.src = "assets/images/clouds.png";
    }
    else if(data.weather[0].main == 'Clear'){
        weatherIcon.src = "assets/images/clear.png";
    }
    else if(data.weather[0].main == 'Rain'){
        weatherIcon.src = "assets/images/rain.png";
    }
    else if(data.weather[0].main == 'Drizzle'){
        weatherIcon.src = "assets/images/drizzle.png";
    }  
    else if(data.weather[0].main == 'Mist'){
        weatherIcon.src = "assets/images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";




}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})


getCityFromLocalStorage();
