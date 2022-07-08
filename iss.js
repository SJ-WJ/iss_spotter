/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const ipAddress = 'https://api.ipify.org?format=json';
const geoLocation = "http://ipwho.is/";


const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(ipAddress, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body);
    callback(null, ip);
  });

};

const fetchCoordsByIP = function(ip, callback) {

  request(geoLocation, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    } 

    //This part ...
    const {latitude, longitude} = parsedBody;
    // callback(null, {latitude, longitude});
    console.log(null, {latitude, longitude});

  })
    
};


module.exports = { fetchMyIP, fetchCoordsByIP };