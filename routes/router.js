const router = require("express-promise-router")();
const useControllers = require("../controllers/authentication");
const {
  validateBody,
  validatBook,
  schemas,
} = require("../helpers/routerHelpers");

const multer = require("multer");
const SavedBook = require("../models/savedbook");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    let filename = Date.now() + file.originalname;
    req.body.image = filename;
    cb(null, filename);
  },
});

let upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

router.post(
  "/addbook",
  upload.single("image"),
  function (req, res, next) {
    console.log(req.body);
    next();
  },
  useControllers.newBook
);

router.route("/").get(useControllers.index);

router
  .route("/cart/:bookId")
  .get(useControllers.getBook)
  .delete(useControllers.deleteBook)
  .put(
    upload.single("image"),
    function (req, res, next) {
      console.log(req.body);
      next();
    },
    useControllers.updateBook
  );

// savedbook

router
  .route("/savebook")
  .get(async (req, res, next) => {
    console.log("i got inside");
    const savedbooks = await SavedBook.find({});
    res.status(200).json(savedbooks);
  })
  .post(validatBook(schemas.idSchema), useControllers.savedBook);

router.route("/delete/:savedbookID").delete(useControllers.removesavedBook);

module.exports = router;
