
var router = require('express').Router();
var count = require('../count/count');

var buttons = {
  'classic': require('../buttons/classic')
};

router.get('/img', function (req, res) {
  var style = req.query.style;
  var service = req.query.service;
  var action = req.query.action;
  var url = req.query.url;
  
  log.info('img request', req.query);

  var invalid = 
    typeof style !== 'string' || 
    typeof service !== 'string' ||
    typeof action != 'string' ||
    typeof url !== 'string' || 
    style.length > 50 ||
    service.length > 50 ||
    action.length > 50 ||
    url.length > 500 ||
    typeof buttons[style] === 'undefined';

  if (invalid) {
    var error = new Error('invalid input');
    log.error(error);
    return res.status(400).send();
  }

  count(service, action, url, function (error, count) {
    if (error) {
      log.error(error);
      return res.status(400).send();
    }

    console.log(count);

    buttons[style](service, action, count, function (error, button) {
      if (error) {
        log.error(error);
        return res.status(400).send();
      }

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': button.length
      });
      
      res.end(button);

    });
  });
});

module.exports = router;