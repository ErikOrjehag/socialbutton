
var secrets = require('./secrets');

module.exports = {

  port: 3000,

  // Secret stuff that you'll have to generate yourself
  fbAppId: secrets.fbAppId,
  fbAppSecret: secrets.fbAppSecret

};