const User = require("../models/user");
const bcrypt = require("bcrypt");

//POST api/v1/auth/login, BODY {email: "email", password: "password"}
const login = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      const isLogin = bcrypt.compareSync(password, user.password);
      if (isLogin) {
        res
          .status(200)
          .send({
            status: true,
            role: user.role,
            message: `Loged in user: ${email}`,
          });
      } else {
        res.status(401).send({
          status: false,
          message: `Wrong password for user: ${email}`,
        });
      }
    } else {
      res.status(403).send({
        status: false,
        message: `User not found: ${email}`,
      });
    }
  });
};

module.exports = {
  login,
};
