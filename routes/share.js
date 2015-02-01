
var router = require('express').Router();

router.get('/share', function (req, res) {
  var service = req.query.service;
  var action = req.query.action;
  var url = req.query.url;

  if (service === 'facebook' && action === 'share') {
    return res.render('thanks', { url: 'http://www.facebook.com/sharer.php?u=' + url });
  }

  return res.send('shit');
});

module.exports = router;