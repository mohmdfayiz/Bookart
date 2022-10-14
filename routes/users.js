var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers');

router.get('/', function (req, res, next) {

    if (req.session.loggedIn) {
        let user = req.session.user;
        productHelpers.getAllBooks().then((books) => {
            res.render('./users/user-home', { books, user })
        })
    }
    else {
        res.redirect('/')
    }
});

module.exports = router;