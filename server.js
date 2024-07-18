const express = require("express");
const path = require("path");
const { urlencoded } = require("express");
const router = require("./routers/router");
const DataBase = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));



app.use(express.json());
app.use(cookieParser());
app.use(router);


app.listen(9700, (err) => {
  if (err) {
    console.log(err);
  } else {
    DataBase();
    console.log("Server Connected http://localhost:9700");
  }
});
