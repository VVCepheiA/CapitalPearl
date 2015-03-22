var express = require('express');
var Donation = require('../models/donation');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Capital Pearl' });
});

router.get('/impact', function(req, res, next) {
  Donation.find(function(err, donations) {
    if (err) { return res.send(err); }
    res.render('impact', { donations: donations });
    // res.json(donations);
  });
});

module.exports = router;
