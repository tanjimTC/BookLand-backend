const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 3200;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const uri = process.env.DB_PATH;

// mongoDB connect
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// check connecttion
mongoose.connection.on("connected", () => {
  console.log("connected");
});

// app set up
app.use(morgan("combined"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

// routes
const route = require("./routes/router");

app.use("/book", route);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
