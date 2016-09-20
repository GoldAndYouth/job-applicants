var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Applicant = mongoose.model('Applicant');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// Get and return all applicants 
router.get('/applicants', function(req, res, next) {
  Applicant.find(function(err, applicants){
    if (err) {
      return next(err);
    }
    res.json(applicants);
  });
});

module.exports = router;
