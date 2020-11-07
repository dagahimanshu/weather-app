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
      callback(
        undefined,
        `It is currently ${currentData.temp} degrees out. There is ${currentData.humidity} humidity. `
      );
    }
  });
};

module.exports = forecast;
