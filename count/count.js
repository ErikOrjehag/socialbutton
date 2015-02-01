
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var fetch = {
  facebook: require('./facebook')
  // ... more services
};

module.exports = function (service, action, url, callback) {

  // Is this supported?
  if (typeof fetch[service] === 'undefined' || typeof fetch[service][action] === 'undefined') {
    return callback(null, 0); // TODO: This is only temporary until we have implemented some more services
    return callback(new Error('service or action does not exist'));
  }

  // Sends what's in the cache to improve speed performance
  mongoose
  .model('CountCache')
  .findOne({ service: service, action: action, url: url }, function (error, doc) {
    if (error) return callback(error);
    return callback(null, doc ? doc.count : 0);
  });

  // Add actual count to the cache
  fetch[service][action](url, function (error, num) {
    if (error) return console.log(error);

    mongoose
    .model('CountCache')
    .update(
      { service: service, action: action, url: url }, 
      { count: num }, 
      { upsert: true }, 
    function (error, result) {
      if (error) return console.log(error);

      console.log('updated cache ('+result+') for ('+service+', '+action+', '+url+')');
    });
  });
};