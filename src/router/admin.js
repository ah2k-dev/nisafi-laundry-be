const express = require("express");
const admin = require("../controllers/adminController.js");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

// get
router.route("/approveUser/:id").get(isAuthenticated, isAdmin, admin.approveUser);
router.route("/users").get(isAuthenticated, isAdmin, admin.getAllUsers);
router.route("/users/:id").get(isAuthenticated, isAdmin, admin.getSingleUser);

module.exports = router;