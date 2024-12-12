const url = "https://weather-api138.p.rapidapi.com/weather?city_name=Delhi";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "3b2106ab24mshaaa26813e6623a6p10b941jsn78bde71dc9e0",
    "x-rapidapi-host": "weather-api138.p.rapidapi.com",
  },
};

const url_lat_lon = 'https://weather-data-api1.p.rapidapi.com/check-forecast?lat=28&lon=77';
const options_lat_lon = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3b2106ab24mshaaa26813e6623a6p10b941jsn78bde71dc9e0',
		'x-rapidapi-host': 'weather-data-api1.p.rapidapi.com'
	}
};

const url_forecast = 'https://forecast9.p.rapidapi.com/rapidapi/forecast/22/78/summary/';
const options_forecast = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3b2106ab24mshaaa26813e6623a6p10b941jsn78bde71dc9e0',
		'x-rapidapi-host': 'forecast9.p.rapidapi.com'
	}
};

const getWeather = (city,chart_lable) => {
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
      speed.innerHTML = Math.round((response.wind.speed)*18/5);
      speed2.innerHTML = Math.round((response.wind.speed)*18/5);
      deg.innerHTML = response.wind.deg;
      visibility.innerHTML = (response.visibility / 1000).toFixed(2) + ' km';

      if(tempCelsius<=10){
        alert(`Attention: Low Temperature Alert! Outdoor temperature is ${tempCelsius} °C. 
          Please ensure workers have adequate protection, and take regular breaks to stay warm.`);
      }

      // Collect temperature data for the graph
      // const temperatureData = [tempCelsius, feelsLikeCelsius, tempMinCelsius, tempMaxCelsius];
      fetch(`https://forecast9.p.rapidapi.com/rapidapi/forecast/${lattitude}/${longitude}/summary/`,options_forecast)
        .then((response)=>response.json())
        .then((response) =>{
          console.log(response);
          // for date and time response.list[0].dt_txt;
          const temp1 = Math.round(response.items[1].temperature.max);
          const temp2 = Math.round(response.items[2].temperature.max);
          const temp3 = Math.round(response.items[3].temperature.max);
          const temp4 = Math.round(response.items[4].temperature.max);
          const temp5 = Math.round(response.items[5].temperature.max);
          const temp6 = Math.round(response.items[6].temperature.max);
          const temp7 = Math.round(response.items[7].temperature.max);

          const min_temp1 = Math.round(response.items[1].temperature.min);
          const min_temp2 = Math.round(response.items[2].temperature.min);
          const min_temp3 = Math.round(response.items[3].temperature.min);
          const min_temp4 = Math.round(response.items[4].temperature.min);
          const min_temp5 = Math.round(response.items[5].temperature.min);
          const min_temp6 = Math.round(response.items[6].temperature.min);
          const min_temp7 = Math.round(response.items[7].temperature.min);

          const temperatureData = [temp1,temp2,temp3,temp3,temp4,temp5,temp6,temp7];
          const temperatureDataMin = [min_temp1,min_temp2,min_temp3,min_temp4,min_temp5,min_temp6,min_temp7];

          const date1 = response.items[1].date;
          const date2 = response.items[2].date;
          const date3 = response.items[3].date;
          const date4 = response.items[4].date;
          const date5 = response.items[5].date;
          const date6 = response.items[6].date;
          const date7 = response.items[7].date;
          let chart_lable = [date1,date2,date3,date4,date5,date6,date7];
        // update TemperatureChartMin(temperatureDataMin,chart_lable);  
        updateTemperatureChart(temperatureData,temperatureDataMin,chart_lable);
        // updateTemperatureChart(temperatureDataMin,chart_lable);

      })
      .catch((err)=>console.log(err));
    // get forecast for next five days
    })
    .catch((err)=> console.log(err));
};

// Chart.js setup
const chart_max = document.getElementById('temperatureChart').getContext('2d');
const temperatureChart = new Chart(chart_max, {
  type: 'line',
  data: {
    labels: [0, 0, 0, 0, 0,0,0],
    datasets: [{
      label: 'Temperature (°C)',
      data: [0, 0, 0, 0, 0,0,0], // Initial data will be replaced
      fill: true,
      color: "rgba(255, 255, 255, 0.8)",
      backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill under the curve
      borderColor: "rgba(255, 99, 132, 1)", // **Change line color here**
      borderWidth: 2, // Line thickness
      pointBackgroundColor: "rgba(255, 255, 255, 1)", // Color for data points
      pointBorderColor: "rgba(255, 99, 132, 1)", // Border color for points
      tension: 0.2
    },
    {
      label: "Min Temperature (°C)",
      data: [0, 0, 0, 0, 0,0,0], // Initial data for Min Temp
      fill: true,
      borderColor: "rgba(54, 162, 235, 1)", // Line color for Min Temp
      pointBackgroundColor: "rgba(54, 162, 235, 1)", // Point color for Min Temp
      tension: 0.2,
    }
  ]
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
const updateTemperatureChart = (data1,data2,chart_lable) => {
  temperatureChart.data.labels = chart_lable;
  temperatureChart.data.datasets[0].data = data1;
  temperatureChart.data.datasets[1].data = data2;
  temperatureChart.update();
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(cityName.value);
});

getWeather("Delhi");
