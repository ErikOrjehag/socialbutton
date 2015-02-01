
var colors = require('colors/safe');
var dateformat = require('dateformat');

module.exports = {

  info: function () {
    doLog(colors.green('info'), arguments);
  },
  warn: function () {
    doLog(colors.yellow('warn'), arguments);
  },
  error: function () {
    doLog(colors.red('error'), arguments);
  }

};

function doLog (status, argus) {

  // Array with arguments to pass to console.log
  var arr = [];

  // Add a nicely formatted timestamp
  arr.push(dateformat('yyyy-mm-dd hh:MM:ss'));
  
  // Add the colored status label
  arr.push('- ' + status + ' -');

  // Add to the body whatever we want to log
  arr = arr.concat(Array.prototype.slice.call(argus));

  // Replace with stack if there is one (Error object)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].stack) {
      arr.splice(i, 1, arr[i].stack);
    }
  }

  // Call console.log with our array as arguments
  console.log.apply(this, arr);
}