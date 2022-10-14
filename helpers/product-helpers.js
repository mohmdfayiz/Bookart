var db = require('../config/connection');
var collection = require('../config/collections');
const { ObjectId } = require('mongodb');
const { response } = require('../app');
module.exports = {

    addBook: (book, callback) => {

        db.get().collection('book').insertOne(book).then((data) => {

            console.log(data.insertedId);
            callback(data.insertedId);
        })
    },

    getAllBooks: () => {
        return new Promise(async (resolve, reject) => {
            let books = await db.get().collection(collection.BOOK_COLLECTION).find().toArray();
            resolve(books)
        })
    },

    deleteBook: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOK_COLLECTION).deleteOne({ _id: ObjectId(prodId) }).then((response) => {
                resolve(response)
            })
        })
    },

    getBookDetails: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOK_COLLECTION).findOne({ _id: ObjectId(prodId) }).then((book) => {
                resolve(book)
            })
        })
    },

    updateBook: (bookId, bookDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOK_COLLECTION).updateOne({ _id: ObjectId(bookId) },
                {
                    $set: {
                        name: bookDetails.name,
                        author: bookDetails.author,
                        description: bookDetails.description,
                        totalQuantity: bookDetails.totalQuantity,
                        currentQuantity: bookDetails.currentQuantity
                    }
                }).then((response) => {
                    resolve()
                })
        })
    },

    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            let users = db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    }
}