const { query } = require('express');
var express = require('express');
const { response } = require('../app');
const userHelpers = require('../helpers/user-helpers');


var router = express.Router();

/* Login page. */
router.get('/', function (req, res) {
  if (req.session.loggedIn) {
    res.redirect('/home');
  }
  else {
    res.render('index');
    req.session.loggedIn = false;
    req.session.adminLoggedIn = false;
  }
});

// form submission
router.post('/login', (req, res) => {

  console.log(req.body);

  let admin = "admin@gmail.com";
  let adminPass = "1234";
  var q = req.body;

  if (q.email === admin && q.password === adminPass) {
    req.session.adminLoggedIn = true;
    res.redirect('/admin');
    
  } else {
    userHelpers.doLogin(req.body).then((response) => {
      if (response.status) {
        req.session.loggedIn = true;
        req.session.user = response.user;
        res.redirect('/home');
      } else {
        req.session.loginError = true;
        res.redirect('/');
        
      }
    })
  }

});

// logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
