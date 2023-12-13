document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("weatherForm").addEventListener("submit", function (event) {
    event.preventDefault();
    getWeatherData();
    toggleContentDisplay("weatherResult", "forecastResult");
  });

  document.getElementById("showForecast").addEventListener("click", function (event) {
    event.preventDefault();
    getWeatherForecast();
    toggleContentDisplay("forecastResult", "weatherResult");
  });
});

function toggleContentDisplay(showId, hideId) {
  const showContent = document.getElementById(showId);
  const hideContent = document.getElementById(hideId);

  showContent.style.display = "block";
  hideContent.style.display = "none";
}


function getWeatherForecast(){
  const apiKey = "67b9be520bafd6807e4ccd0f27dad2f7";
  const city = document.getElementById("cityInput").value;
  const apiForecastSource = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiForecastSource)
  .then((response)=>response.json())
  .then((data)=>{
    renderForecastData(data);
    console.log(data);
  });

}

function renderForecastData(data){
  const forecastContainer = document.getElementById("forecastResult");
  forecastContainer.innerHTML = "";

  const options = {month:"short", day:"numeric"};
  const dateFormatter = new Intl.DateTimeFormat("en-US", options);

  for(let i=0;i<data.list.length;i+=8){
    const forecast = data.list[i];
    const forecastDate = new Date(forecast.dt *1000)
    const formattedDate = dateFormatter.format(forecastDate);

    const temperature = Math.floor(forecast.main.temp) + '°C';

    const forecastCard = createForecastCard(formattedDate,temperature);
    forecastContainer.appendChild(forecastCard);
    
  }

}

function createForecastCard(date,temperature){
  const forecastCard = document.createElement("div");
  forecastCard.classList.add("card","text-center");
  forecastCard.innerHTML=`
  <div class="card-body">
  <h5 class="card-title font-Roboto-20px">${date}</h5>
  <p class="card-text font-Roboto-42px">${temperature}</p>
</div>
  
  
  `
  return forecastCard;
}


function getWeatherData() {
  const apiKey = "67b9be520bafd6807e4ccd0f27dad2f7"; // Replace with your API key
  const city = document.getElementById("cityInput").value;
  const apiSource = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiSource)
    .then((response) => response.json())
    .then((data) => {
      renderWeatherData(data);
    });
}

function renderWeatherData(data) {
  const resultContainer = document.getElementById("weatherResult");
  resultContainer.innerHTML = "";

  const city = data.name;
  const temperature = Math.floor(data.main.temp) + "°C";

  const description = data.weather[0].description;

  // let capitalizedDescription = capitalizeEachWord(description);

  const windSpeed = data.wind.speed + " km/h";

  const humidity = data.main.humidity + "%";

  const visibility = data.visibility / 1000 + " km";

  const pressure = data.main.pressure + "mb";

  const maxTemp = Math.floor(data.main.temp_max) + "°C";
  const minTemp = Math.floor(data.main.temp_min) + "°C";
  console.log(data);

  const resultCard = createResultCard(
    city,
    temperature,
    description,
    windSpeed,
    maxTemp,
    minTemp,
    humidity,
    visibility,
    pressure
  );
  resultContainer.appendChild(resultCard);

  const weatherBackgroundChange = document.getElementById(
    "weatherBackgroundChange"
  );
  weatherBackgroundChange.classList.add("background-image-contain");
}

function createResultCard(
  city,
  temperature,
  description,
  windSpeed,
  maxTemp,
  minTemp,
  humidity,
  visibility,
  pressure
) {
  const resultCard = document.createElement("div");
  resultCard.classList.add("card", "text-center");
  resultCard.innerHTML = `
      <div class="card-body font-Roboto-20px">
      <h5 class="card-title font-Roboto-20px">${city}</h5>
        <p class="card-text upper-case-text">${description}</p>
        
        <p class="card-text font-Roboto-42px">${temperature}</p>
        <p class="card-text font-Roboto-20px">High: ${maxTemp}</p>
        <p class="card-text font-Roboto-20px">Low: ${minTemp}</p>
        
        <div class="row text-center">
        <div class="col-6 py-4">
          <div class="d-flex justify-content-center align-items-center gap-3">
            <img src="./resources/images/wind.png" height="40px" alt="">
            <div>Wind</div>
          </div>

          <div class="pt-2">${windSpeed}</div>
        </div>

        <div class="col-6 py-4">
            <div class="d-flex justify-content-center align-items-center gap-3">
              <img src="./resources/images/humidity.png" height="40px" alt="">
              <div>Humidity</div>
            </div>
  
            <div class="pt-2">${humidity}</div>
          </div>

          <div class="col-6 py-4">
            <div class="d-flex justify-content-center align-items-center gap-3">
              <img src="./resources/images/view.png" height="40px" alt="">
              <div>Visibility</div>
            </div>
  
            <div class="pt-2">${visibility}</div>
          </div>


          <div class="col-6 py-4">
            <div class="d-flex justify-content-center align-items-center gap-3">
              <img src="./resources/images/pressure-gauge.png" height="40px" alt="">
              <div>Pressure</div>
            </div>
  
            <div class="pt-2">${pressure}</div>
          </div>
        </div>
    

      <div class="card-footer text-muted">
        Powered by Weather API
      </div>
    `;
  return resultCard;
}




// function to capitalize each first word
// function capitalizeEachWord(sentence) {
//   return sentence.replace(/\b\w/g, function (char) {
//       return char.toUpperCase();
//   });
// }
