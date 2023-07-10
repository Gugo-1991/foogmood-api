const express = require("express");
const { login, logout } = require("../controllers/authCtrl");

const router = express.Router();

router.post("/login", login);

module.exports = router;
