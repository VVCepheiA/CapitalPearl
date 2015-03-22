var Customer = require('../models/customer');
var Donation = require('../models/donation');
var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

//Get all customers
router.route('/').get(function(req, res) {
  Customer.find(function(err, customers) {
    if (err) {
      return res.send(err);
    }
    res.json(customers);
  });
});

//Delete all customers
router.route('/cleanall').delete(function(req, res) {
  Customer.remove({}, function(err, customer) {
    if (err) {
      return res.send(err);
    }
    res.send("Customers successfully deleted.");
  });
});

//Create one customer
router.route('/').post(function(req, res) {
  var customer = new Customer(req.body);

  customer.save(function(err) {
    if (err) {
      return res.send(err);
    }
    res.send({ message: 'Customer Added' });
  });
});

//Update one customer by id
router.route('/:id').put(function(req,res){
  Customer.findOne({ _id: req.params.id }, function(err, customer) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      customer[prop] = req.body[prop];
    }

    // save the customer
    customer.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Customer updated!' });
    });
  });
});

//Get one customer by id
router.route('/:id').get(function(req, res) {
  Customer.findOne({ _id: req.params.id}, function(err, customer) {
    if (err) {
      return res.send(err);
    }
    res.json(customer);
  });
});


//Delete one customer by id
router.route('/:id').delete(function(req, res) {
  Customer.remove({
    _id: req.params.id
  }, function(err, customer) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});

//===========================Donation API=================================

router.route('/login').post(function(req, res) {
  console.log(req.body);
  Customer.findOne({
    cardnumber: req.body.cardnumber,
    zipcode: req.body.zipcode,
    code: req.body.code,
    lastname: req.body.lastname,
    firstname: req.body.firstname
  }, function(err, customer) {
    if (err) {
      return res.send(err);
    }
    res.json({ customer: customer });
  });
});


router.route('/donate').post(function(req, res) {
  console.log(req.body);
  Customer.findOne({
    cardnumber: req.body.cardnumber
  }, function(err, customer) {
    if (err) { return res.send(err); }

    var donation = new Donation({
      "customer": customer.id,
      "donated": req.body.donation,
      "originpoint": customer["rewards"],
      "charity": "Test"
    });
    donation.save(function(err) {
      if (err) { return res.send(err); }
    });

    customer["rewards"] = customer["rewards"]-req.body.donation;
    customer.save(function(err) {
      if (err) { return res.send(err); }
      res.json({ message: 'Customer updated!' });
    });

  });
});



module.exports = router;

