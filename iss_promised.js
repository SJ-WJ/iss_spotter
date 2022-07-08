const request = require('request-promise-native');
const ipAddress = 'https://api.ipify.org?format=json';
const geoLocation = "http://ipwho.is/";

const fetchMyIP = function() {
  return request(ipAddress);

};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);

};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};





module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};