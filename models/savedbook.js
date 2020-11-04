const mongoose = require("mongoose");

const savedbookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
});

const SavedBook = mongoose.model("savedbook", savedbookSchema);
module.exports = SavedBook;
