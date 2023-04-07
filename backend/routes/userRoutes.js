const express = require("express");
const { createUser, getuserdetails ,getallusers, deleteuser, updateprofile, addtocart, loginid, logOut, getmydetailid} = require("../controller/userController");
const { isAuthentictedUser } = require("../auth/auth");
const router = express.Router();

router.route("/newuser").post(createUser);
router.route("/getuser/:id").get(isAuthentictedUser,getuserdetails);
router.route("/getuserdata").get(isAuthentictedUser,getmydetailid);
router.route("/getallusers").get(getallusers)
router.route("/deleteuser/:id").delete(deleteuser);
router.route("/updateuser/:id").put(updateprofile);
router.route("/addToCart/:id").post(addtocart)
router.route("/login").post(loginid);
router.route("/logout").get(logOut);

module.exports = router;
