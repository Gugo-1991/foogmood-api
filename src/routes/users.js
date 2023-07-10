const express = require('express');
const Users = require('../controllers/usersCtrl');

const router = express.Router();

router.get('/', Users.getUsers);
router.post('/', Users.createUser);
router.get('/:id', Users.getUserById);

module.exports = router;

