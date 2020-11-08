const request = require("request");

const forecast = ({ lat, long }, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=abaea628a47f6a5b303c42b1b816aaab&units=metric`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (response.body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const currentData = response.body.current;
      const id = currentData.weather[0].id;
      let weatherReport = "";
      if (id >= 200 && id < 700)
        weatherReport = "It is " + currentData.weather[0].description;
      else if (id >= 700 && id < 800)
        weatherReport =
          "There is " + currentData.weather[0].description + " in atmosphere";
      else if (id == 800) weatherReport = "Sky is clear";
      else if (id > 800)
        weatherReport = "There are " + currentData.weather[0].description;
      callback(undefined, {
        info: `${weatherReport}. It is currently ${currentData.temp} degrees out. It feels  like ${currentData.feels_like} degrees. `,
      });
    }
  });
};

module.exports = forecast;
