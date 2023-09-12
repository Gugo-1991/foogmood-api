const express = require("express");
const Users = require("../controllers/usersCtrl");

const router = express.Router();

router.get("/", Users.getUsers);
router.post("/", Users.createUser);
router.post("/initFirstUser", Users.initFirstUser);
router.get("/:id", Users.getUserById);
router.put("/:id", Users.updateUserById);
router.delete("/:id", Users.deleteById);

module.exports = router;
