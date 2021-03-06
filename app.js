
var express = require('express');
var fs = require('fs');
var img = require('./routes/img');
var share = require('./routes/share');
var config = require('./config');

fs.readdirSync(__dirname + '/models').forEach(function (filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(img);
app.use(share);

var server = app.listen(config.port, '0.0.0.0', function () {
  var address = server.address().address;
  var port = server.address().port;
  console.log(address, port);
});