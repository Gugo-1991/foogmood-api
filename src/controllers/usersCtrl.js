const User = require("../models/user");
const { role } = require("../enums");

const getUsers = async (req, res) => {
  User.find().then(async (users) => {
    if (users.length === 0) {
      const user = new User({
        name: "Gurgen",
        secondName: "Vardanyan",
        email: "gurgen@gmail.com",
        password: "gurgen",
        role: role.admin,
      });
      await user
        .save()
        .then((newUser) => {
          console.log(`Creating user: ${newUser}`);
          res.status(200).send(
            [newUser].map((user) => {
              return {
                name: user.name,
                secondName: user.secondName,
                email: user.email,
                role: user.role,
                createdDate: user.createdDate,
              };
            })
          );
        })
        .catch((e) => {
          console.log(`Error creating user: ${user}`);
          res.status(500).send(e);
        });
    } else {
      console.log(`Getting all users`);
      res.status(200).send(
        users.map((user) => {
          return {
            name: user.name,
            secondName: user.secondName,
            email: user.email,
            role: user.role,
            createdDate: user.createdDate,
          };
        })
      );
    }
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(200).send({
        name: user.name,
        secondName: user.secondName,
        email: user.email,
        role: user.role,
        createdDate: user.createdDate,
      });
    })
    .catch((e) => {
      console.log(`Error getting user id: ${id}`);
      res.status(500).send(e);
    });
};

const createUser = async (req, res) => {
  const { user } = req.body;
  User.save(user)
    .then((user) => {
      res.status(200).send({
        name: user.name,
        secondName: user.secondName,
        email: user.email,
        role: user.role,
        createdDate: user.createdDate,
      });
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
};
