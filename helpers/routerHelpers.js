const Joi = require("joi");
const User = require("../models/book");
const SavedBook = require("../models/savedbook");

module.exports = {
  validateBody: (schema) => {
    return async (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error)
        return res.status(400).send(result.error.details[0].message);

      // if (!req.file) return console.log("Please upload a file");
      console.log("req body", req.body);
      console.log("req file", req.body.file);
      next();
    };
  },

  validatBook: (schema) => {
    return async (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error)
        return res.status(400).send(result.error.details[0].message);

      const bookExists = await SavedBook.findOne({ id: req.body.id });
      if (bookExists) return res.status(400).send("Book already saved");
      next();
    };
  },

  schemas: {
    bookSchema: Joi.object().keys({
      bookName: Joi.string().required(),
      author: Joi.string().required(),
      genre: Joi.string().required(),
      price: Joi.string().required(),
      image: Joi.any().required(),
    }),

    idSchema: Joi.object().keys({
      id: Joi.string().required(),
      bookName: Joi.string().required(),
    }),
  },
};
