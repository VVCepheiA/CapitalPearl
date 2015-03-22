var Donation = require('../models/donation');
var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

//Get all donations
router.route('/').get(function(req, res) {
  Donation.find(function(err, donations) {
    if (err) {
      return res.send(err);
    }
    res.json(donations);
  });
});

//Delete all donations
router.route('/cleanall').delete(function(req, res) {
  Donation.remove({}, function(err, donation) {
    if (err) {
      return res.send(err);
    }
    res.send("Donations successfully deleted.");
  });
});

//Create one donation
router.route('/').post(function(req, res) {
  var donation = new Donation(req.body);

  donation.save(function(err) {
    if (err) {
      return res.send(err);
    }
    res.send({ message: 'Donation Added' });
  });
});

//Update one donation by id
router.route('/:id').put(function(req,res){
  Donation.findOne({ _id: req.params.id }, function(err, donation) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      donation[prop] = req.body[prop];
    }

    // save the donation
    donation.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Donation updated!' });
    });
  });
});

//Get one donation by id
router.route('/:id').get(function(req, res) {
  Donation.findOne({ _id: req.params.id}, function(err, donation) {
    if (err) {
      return res.send(err);
    }
    res.json(donation);
  });
});


//Delete one donation by id
router.route('/:id').delete(function(req, res) {
  Donation.remove({
    _id: req.params.id
  }, function(err, donation) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;

