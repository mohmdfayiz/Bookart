var express = require('express');
const { response } = require('../app');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')

router.get('/',function(req,res,next){
    res.render('signup');
});

router.post('/reg',function(req,res,next){
 
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    res.redirect('/');
  })
  

});

module.exports = router;