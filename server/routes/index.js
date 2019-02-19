var express = require('express');
var router = express.Router();
router.get('/users', function(req, res, next) {
  res.send('hello')
});

module.exports = router;
