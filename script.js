const container = document.querySelector(".container");
const search = document.querySelector(".searchbox button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const err404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const apiKey = "48585ddbabf251127906d1fb1ad2149b";
  const city = document.querySelector(".searchbox input").value;
  if (city == " ") {
    return;
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod == "404") {
          cityHide.textContent = city;
          container.style.height = "400px";
          weatherBox.classList.remove("active");
          weatherDetails.classList.remove("active");
          err404.classList.add("active");
          return;
        }

        const image = document.querySelector(".weather-box .weather img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(
          ".weather-details .humidity span"
        );
        const wind = document.querySelector(".weather-details .wind span");

        if (cityHide.textContent == city) {
          return;
        } else {
          cityHide.textContent = city;
          container.style.height = "555px";
          weatherBox.classList.add("active");
          weatherDetails.classList.add("active");
          err404.classList.remove("active");

          switch (json.weather[0].main) {
            case "Clear":
              image.src = "images/clear.png";
              break;

            case "Rain":
              image.src = "images/rain.png";
              break;

            case "Snow":
              image.src = "images/snow.png";
              break;

            case "Mist":
              image.src = "images/mist.png";
              break;

            case "Cloud":
              image.src = "images/cloud.png";
              break;

            case "Haze":
              image.src = "images/haze.png";
              break;

            default:
              image.src = "images/cloud.png";
          }

          temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${json.wind.speed}km/h`;
        }
      });
  }
});
