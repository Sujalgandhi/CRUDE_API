const mongoose = require("mongoose");

let DataBase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sujalgandhi0507:sujal0507@cluster0.u273qf7.mongodb.net/crude"
    );
    console.log("Database Connected....");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DataBase;