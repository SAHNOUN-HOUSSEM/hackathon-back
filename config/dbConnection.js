const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

const dbConnection = () => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("connected to the database");
    })
    .catch((err) => {
      console.error("failed to connect to the database");
      console.error(err.stack);
    });
};

module.exports = dbConnection;
