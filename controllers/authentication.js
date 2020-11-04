const Book = require("../models/book");
const SavedBook = require("../models/savedbook");
require("dotenv").config();

module.exports = {
  index: async (req, res, next) => {
    const books = await Book.find({});
    res.status(200).json(books);
  },

  books: async (req, res, next) => {
    console.log("i got inside");
    const savedbooks = await SavedBook.find({});
    res.status(200).json(savedbooks);
  },

  newBook: async (req, res, next) => {
    const newBook = await new Book({
      bookName: req.body.bookName,
      author: req.body.author,
      genre: req.body.genre,
      price: req.body.price,
      image: req.body.image,
    });
    const book = await newBook.save();
    res.status(200).send(book);
  },

  savedBook: async (req, res, next) => {
    const savedBook = await new SavedBook({
      id: req.body.id,
      bookName: req.body.bookName,
    });
    const savedbook = await savedBook.save();
    res.status(200).send(savedbook);
  },

  getBook: async (req, res, next) => {
    const { bookId } = req.params;
    console.log("getbook", bookId);
    const book = await Book.findById(bookId);
    res.status(200).json(book);
  },

  updateBook: async (req, res, next) => {
    //req.body may contains any number of fields
    const { bookId } = req.params;
    const newBook = req.body;
    const result = await Book.findByIdAndUpdate(bookId, newBook);
    res.status(200).json({ status: true });
  },

  deleteBook: async (req, res, next) => {
    const bookId = req.params.bookId;
    const book = await Book.remove({ _id: bookId });
    res.status(200).json(book);
  },

  removesavedBook: async (req, res, next) => {
    const { savedbookID } = req.params;
    console.log("savedbook", savedbookID);
    const savedbook = await SavedBook.deleteOne({ id: savedbookID });
    res.status(200).json(savedbook);
  },
};
