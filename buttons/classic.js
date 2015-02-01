
var fs = require('fs');
var Canvas = require('canvas');
var Image = Canvas.Image;

var icons = {
  'facebook': {
    'share': fs.readFileSync('./icons/facebookShare.png')
  },
  'twitter': {
    'tweet': fs.readFileSync('./icons/twitterTweet.png')
  },
  'google': {
    'plus': fs.readFileSync('./icons/googlePlus.png')
    //'share':
  }
};

var bubbleStart = new Image();
bubbleStart.src = fs.readFileSync('./icons/bubbleStart.png');
var bubbleMiddle = new Image();
bubbleMiddle.src = fs.readFileSync('./icons/bubbleMiddle.png');
var bubbleEnd = new Image();
bubbleEnd.src = fs.readFileSync('./icons/bubbleEnd.png');

// Styling
var spacing = 2;
var font = "11px 'Helvetica Neue'";

module.exports = function (service, action, count, callback) {

  if (typeof icons[service] === 'undefined') {
    return callback(new Error('unsupported service ('+service+')'));
  } else if (typeof icons[service][action] === 'undefined') {
    return callback(new Error('unsupported action ('+action+')'));
  }

  var icon = new Image();
  icon.src = icons[service][action];

  var button = generateButton(icon, count);

  return callback(null, button);
};


function generateButton (icon, count) {

  var messureCanvas = new Canvas(100, 100);
  var messureCtx = messureCanvas.getContext('2d');

  var bubbleStartPosX = icon.width + spacing;
  var countPosX = bubbleStartPosX + bubbleStart.width;
  var countWidth = messureCtx.measureText(count).width + 1;
  var bubbleEndPosX =  bubbleStartPosX + bubbleStart.width + countWidth;
  var totalWidth = bubbleEndPosX + bubbleEnd.width;
  var height = icon.height;

  var canvas = new Canvas(totalWidth, height);

  var ctx = canvas.getContext('2d');
  
  ctx.drawImage(icon, 0, 0);

  ctx.drawImage(bubbleStart, bubbleStartPosX, 0);

  for (var i = 0; i < countWidth; i++) {
    ctx.drawImage(bubbleMiddle, countPosX + i, 0);
  }

  ctx.drawImage(bubbleEnd, bubbleEndPosX, 0);

  ctx.font = font;
  ctx.fillStyle = '#888';
  ctx.fillText(count, countPosX, 14);
  
  return canvas.toBuffer();
}