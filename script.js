const url = "https://weather-api138.p.rapidapi.com/weather?city_name=Delhi";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "3b2106ab24mshaaa26813e6623a6p10b941jsn78bde71dc9e0",
    "x-rapidapi-host": "weather-api138.p.rapidapi.com",
  },
};

const getWeather = (city) => {

	city1.innerHTML = city;
  	fetch("https://weather-api138.p.rapidapi.com/weather?city_name="+city, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      temp.innerHTML = Math.round(response.main.temp-273.15);
	  temp2.innerHTML = Math.round(response.main.temp-273.15);
      feels_like.innerHTML = Math.round(response.main.feels_like-273.15);
      temp_min.innerHTML = Math.round(response.main.temp_min-273.15);
      temp_max.innerHTML = Math.round(response.main.temp_max-273.15);
      pressure.innerHTML = response.main.pressure;
      humidity.innerHTML = response.main.humidity;
	  humidity2.innerHTML = response.main.humidity;
    //   sea_level.innerHTML = response.main.sea_level;
    //   grnd_level.innerHTML = response.main.grnd_level;
      speed.innerHTML = response.wind.speed;
	  speed2.innerHTML = response.wind.speed;
      deg.innerHTML = response.wind.deg;
      visibility.innerHTML = response.visibility;
    })
    .catch((err) => console.error(err));
};

submit.addEventListener("click", (e)=>{
	e.preventDefault()
	getWeather(cityName.value)
}
)

getWeather("Delhi")
