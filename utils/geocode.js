const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGltYW5zaHUtZGFnYSIsImEiOiJja2d5bnlwMW8wdmtzMnJwZnd1ZWl3dzVwIn0.iVbdZxPrIYbA4biPCt3wDQ&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location provider!", undefined);
    } else if (response.body.message || response.body.features.length === 0) {
      callback("Unable to find the location!", undefined);
    } else {
      const { center, place_name } = response.body.features[0];
      const long = center[0];
      const lat = center[1];
      callback(undefined, {
        lat,
        long,
        location: place_name,
      });
    }
  });
};

module.exports = geoCode;
