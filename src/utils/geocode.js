const request = require("postman-request");

const goecode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWhtZWR5b3VzZWZ4MSIsImEiOiJja25iaDdrYWwwNTdpMm9wNWk2aXh0Yzg2In0.0FSaXhZMWnTWeuLF0xVSjg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback("Unable to connect to location service!");
    }

    if (body.features.length === 0) {
      return callback("Unable to find location. Try another search");
    }

    const [longitude, latitude] = body.features[0].center;
    const location = body.features[0].place_name;
    callback(undefined, { latitude, longitude, location });
  });
};

module.exports = goecode;
