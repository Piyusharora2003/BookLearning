const mongoose = require("mongoose");
require('dotenv');
const Url = process.env.URL
const connectDatabase = () => {
    mongoose
      .connect(Url)
      .then(() => {
        console.log(`Mongodb connected with server`);
      });
  };
  
  module.exports = connectDatabase;