
var request = require('request');
var config = require('../config');

var fbToken = config.fbAppId + '|' + config.fbAppSecret;

// Service: facebook
module.exports = {

  // Action: share
  share: function (url, callback) {
    request.get(
      { json: true, url: 'https://graph.facebook.com/v2.1/?id=' + encodeURIComponent(url) + '&access_token=' + fbToken },
    function (error, resp, body) {
      if (error) return callback(error);

      if (typeof body.share === 'undefined' || typeof body.share.share_count === 'undefined') {
        return callback(new Error('not sharable', service, action, url));
      }

      return callback(null, body.share.share_count);
    });
  },

  // Action: like
  like: function (url, callback) {

  }

  // ... more actions

};