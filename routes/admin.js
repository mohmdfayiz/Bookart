const { query, response } = require('express');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers');

// Admin home page
router.get('/', function (req, res, next) {
    if (req.session.adminLoggedIn){
        productHelpers.getAllBooks().then((books) => {
            res.render('./admin/admin-home', { books });
        })
    } else {
        res.redirect('/')
    }

});

// Add new book
router.get('/addNew', (req, res) => {
    res.render('admin/addBooks');
});

// form submission
router.post('/submit', (req, res) => {
    // console.log(req.body);
    // console.log(req.files.image);

    productHelpers.addBook(req.body, (id) => {

        let image = req.files.image;
        image.mv('./public/book-images/' + id + '.jpg', (err) => {
            if (!err) {
                res.render('admin/addBooks');
            }
            else {
                console.log(err);
            }
        })
    });
});

// Delete a book 
router.get('/delete', (req, res) => {
    let book_id = req.query.id
    console.log(book_id)
    productHelpers.deleteBook(book_id).then(() => {
        res.redirect('/admin')
    })
})

// Edit a book 
router.get('/edit-book/:id', async (req, res) => {
    let book = await productHelpers.getBookDetails(req.params.id)
    console.log(book)
    res.render('admin/edit-book', { book })
})

router.post('/edit-book/:id', async (req, res) => {
    productHelpers.updateBook(req.params.id, req.body).then(() => {
        res.redirect('/admin');
        // if (req.files.image) {
        //     let image = req.files.image;
        //     let id = req.params.id;
        //     image.mv('./public/book-images/' + id + '.jpg')
        // }
    })
})

// All users
router.get('/allUsers', (req, res) => {
    productHelpers.getAllUsers().then((users) => {
        res.render('admin/allUsers', { users });
    })
})

module.exports = router;