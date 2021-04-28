const request = require("postman-request");

const forecast = (lang, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0a1fae43bb6e64fbf67bc314e12f169b&query=${lang},${long}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback("Unable to connect to weather service!", undefined);
    }

    if (body.error) {
      return callback("Unable to find location", undefined);
    }

    const {
      temperature,
      feelslike,
      weather_descriptions,
      humidity,
    } = body.current;

    const forecast = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. 
    It's feels like ${feelslike} degrees out. 
    The humidity is ${humidity}%.`;
    callback(undefined, forecast);
  });
};

module.exports = forecast;
