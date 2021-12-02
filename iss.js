const request = require('request');


//Makes a single API request to retrieve the user's IP address.

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    //pass through the error to the callback if an error occurs when requesting the IP data
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    //parse and extract the IP address using JSON and then pass that through to the callback if no error
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


//Makes a single API request to retrieve the user's geolocation coordinates.
const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=e3956d60-53c6-11ec-a9e6-4d5eaa4d8a0b`, (error, response, body) => {
    //pass through the error to the callback if an error occurs when requesting the Coord data
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = {};
    data.latitude = JSON.parse(body).latitude;
    data.longitude = JSON.parse(body).longitude;
    callback(null, data);
  });
};


 // Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.

 const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };