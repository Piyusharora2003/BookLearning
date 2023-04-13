require('dotenv').config();
const app = require("./app.js")
const connectDatabase = require("./config/connectdb.js");

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

connectDatabase();

const server = app.listen(2000,()=>{
    console.log(`Server running successfully`)
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
      process.exit(1);
    });
    
  });