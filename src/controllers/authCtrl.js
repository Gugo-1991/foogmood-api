const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  User.find({ email, password }).then((user) => {
    if (user) {
      res.status(200).send(true);
    } else {
      res.status(401).send(false);
    }
  });
};

module.exports = {
  login,
};
