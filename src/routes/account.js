const express = require("express");
const {
  getUserAccount,
  fillUserBalance,
  assignAccountToUser,
} = require("../controllers/accoutnCtrl");

const router = express.Router();

router.get("/:userId", getUserAccount);
router.put("/:userId/:amount", fillUserBalance);
router.put("/:userId", assignAccountToUser);

module.exports = router;
