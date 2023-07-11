const express = require("express");
const {
  getUserAccount,
  fillUserBalance,
} = require("../controllers/accoutnCtrl");

const router = express.Router();

router.get("/:userId", getUserAccount);
router.put("/:userId/:amount", fillUserBalance);

module.exports = router;
