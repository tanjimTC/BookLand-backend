const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

const Book = mongoose.model("book", bookSchema);
module.exports = Book;
