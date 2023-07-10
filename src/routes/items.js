const express = require("express");
const Items = require("../controllers/itemsCtrl");

const router = express.Router();

router.get("/", Items.getItems);
router.post("/", Items.createItem);
router.get("/:id", Items.getItemById);

module.exports = router;
