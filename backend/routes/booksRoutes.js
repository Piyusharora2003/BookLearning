const express = require("express");
const router = express.Router();
const {addbook, getbooks,updateBook, getBookByID, deleteBook} = require("../controller/booksController.js");
const { isAuthentictedUser, isAuthentictedRole } = require("../auth/auth.js");

// CRUD Operations on Books
router.route("/addnewbook").post(addbook);
router.route("/getallbooks").get(getbooks);
router.route("/getbook/:id").get(getBookByID);
router.route("/updatebook/:id").put(updateBook)
router.route("/remove/:id").delete(deleteBook)


module.exports = router;