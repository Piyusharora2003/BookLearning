const mongoose = require("mongoose");

const Url = "mongodb+srv://booksnerd:1003%40merndspro@booksproject.lcekstm.mongodb.net/?retryWrites=true&w=majority";
            //  mongodb+srv://booksnerd:<password>    @booksproject.lcekstm.mongodb.net/?retryWrites=true&w=majority

const connectDatabase = () => {
    mongoose
      .connect(Url)
      .then(() => {
        console.log(`Mongodb connected with server`);
      });
  };
  
  module.exports = connectDatabase;