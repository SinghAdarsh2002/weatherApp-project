const url = "https://weather-api138.p.rapidapi.com/weather?city_name=Delhi";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "3b2106ab24mshaaa26813e6623a6p10b941jsn78bde71dc9e0",
    "x-rapidapi-host": "weather-api138.p.rapidapi.com",
  },
};

const url_forecast = 'https://weather-data-api1.p.rapidapi.com/check-forecast?lat=28&lon=77';
const options_forecast = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3b2106ab24mshaaa26813e6623a6p10b941jsn78bde71dc9e0',
		'x-rapidapi-host': 'weather-data-api1.p.rapidapi.com'
	}
};



const getWeather = (city) => {
  city1.innerHTML = city;

  let lattitude=0;
  let longitude=0;

  // fetch data for realtime weather 
  fetch("https://weather-api138.p.rapidapi.com/weather?city_name=" + city, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      // Temperature conversion from Kelvin to Celsius
      const tempCelsius = Math.round(response.main.temp - 273.15);
      const feelsLikeCelsius = Math.round(response.main.feels_like - 273.15);
      const tempMinCelsius = Math.round(response.main.temp_min - 273.15);
      const tempMaxCelsius = Math.round(response.main.temp_max - 273.15);
      lattitude = response.coord.lat;
      longitude = response.coord.lon;

      console.log(lattitude);
      console.log(longitude);
      // Update HTML elements
      temp.innerHTML = tempCelsius;
      temp2.innerHTML = tempCelsius;
      feels_like.innerHTML = feelsLikeCelsius;
      temp_min.innerHTML = tempMinCelsius;
      temp_max.innerHTML = tempMaxCelsius;
      pressure.innerHTML = response.main.pressure;
      humidity.innerHTML = response.main.humidity;
      humidity2.innerHTML = response.main.humidity;
      speed.innerHTML = response.wind.speed;
      speed2.innerHTML = response.wind.speed;
      deg.innerHTML = response.wind.deg;
      visibility.innerHTML = response.visibility;

      // Collect temperature data for the graph
      // const temperatureData = [tempCelsius, feelsLikeCelsius, tempMinCelsius, tempMaxCelsius];
      fetch(`https://weather-data-api1.p.rapidapi.com/check-forecast?lat=${lattitude}&lon=${longitude}`,options_forecast)
        .then((response)=>response.json())
        .then((response) =>{
          console.log(response);
          // for date and time response.list[0].dt_txt;
          const temp1 = Math.round((response.list[1].main.temp-273),2);
          const temp2 = Math.round((response.list[2].main.temp-273),2);
          const temp3 = Math.round((response.list[3].main.temp-273),2);
          const temp4 = Math.round((response.list[4].main.temp-273),2);
          const temp5 = Math.round((response.list[5].main.temp-273),2);
          const temp6 = Math.round((response.list[6].main.temp-273),2);
          const temp7 = Math.round((response.list[7].main.temp-273),2);
          const temp8 = Math.round((response.list[8].main.temp-273),2);

          const temperatureData = [temp1,temp2,temp3,temp3,temp4,temp5,temp6,temp6,temp7,temp8];
        updateTemperatureChart(temperatureData);
      })
      .catch((err)=>console.log(err));
    // get forecast for next five days
    })
    .catch((err)=> console.log(err));
};

// Chart.js setup
const ctx = document.getElementById('temperatureChart').getContext('2d');
const temperatureChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['00:00', '03:00', '06:00', '09:00','12:00','15:00','18:00','21:00'],
    datasets: [{
      label: 'Temperature (°C)',
      data: [0, 0, 0, 0, 0, 0, 0, 0], // Initial data will be replaced
      fill: true,
      color: "rgba(255, 255, 255, 0.8)",
      backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill under the curve
      borderColor: "rgba(255, 99, 132, 1)", // **Change line color here**
      borderWidth: 2, // Line thickness
      pointBackgroundColor: "rgba(255, 255, 255, 1)", // Color for data points
      pointBorderColor: "rgba(255, 99, 132, 1)", // Border color for points
      tension: 0.2
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

// Function to update the temperature chart
const updateTemperatureChart = (data) => {
  temperatureChart.data.datasets[0].data = data;
  temperatureChart.update();
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(cityName.value);
});

getWeather("Delhi");
