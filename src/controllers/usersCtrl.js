const User = require("../models/user");
const { role } = require("../enums");
const Account = require("../models/account");
const bcrypt = require("bcrypt");

//GET api/v1/users
const getUsers = async (req, res) => {
  User.find()
    .then(async (users) => {
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
    })
    .catch((e) => {
      console.log(`Error getting all users`);
      res.status(500).send(e);
    });
};

//GET api/v1/users/:id
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

//POST api/v1/users, BODY see User model
const createUser = async (req, res) => {
  const user = req.body;
  console.log(user);
  const userExists = await userWithEmailExists(user.email);
  console.log(user);

  if (userExists) {
    res
      .status(500)
      .send({ message: `User with email already exists: ${user.email}` });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        new User(user)
          .save()
          .then((user) => {
            new Account({ userId: user })
              .save()
              .then(() => {
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
          })
          .catch((e) => {
            console.log(`Error creating user account, user id: ${user.id}`);
            res.status(500).send(e);
          });
      });
    });
  }
};

//POST api/v1/users/initFirstUser
const initFirstUser = (req, res) => {
  User.find().then(async (users) => {
    if (users.length === 0) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash("gurgen", salt, (err, hash) => {
          const user = new User({
            name: "Gurgen",
            secondName: "Vardanyan",
            email: "gurgen@gmail.com",
            password: hash,
            role: role.admin,
          });
          User.findOneAndUpdate(
            { email: user.email },
            {
              $set: {
                name: "Gurgen",
                secondName: "Vardanyan",
                email: "gurgen@gmail.com",
                password: hash,
                role: role.admin,
              },
            },
            {
              upsert: true,
              new: true,
              setDefaultsOnInsert: true,
            }
          )
            .then((newUser) => {
              Account.findOneAndUpdate(
                { userId: newUser._id },
                {
                  $set: {
                    userId: newUser._id,
                  },
                },
                {
                  upsert: true,
                  new: true,
                  setDefaultsOnInsert: true,
                }
              ).then(() => {
                res.status(200).send({
                  name: newUser.name,
                  secondName: newUser.secondName,
                  email: newUser.email,
                  password: hash,
                  role: newUser.role,
                  createdDate: newUser.createdDate,
                });
              });
            })
            .catch((e) => {
              console.log(`Error creating user: ${user.name}`);
              res.status(500).send(e);
            });
        });
      });
    } else {
      res.send(`Number of users is: ${users.length}`);
    }
  });
};

const userWithEmailExists = async (email) => {
  const users = await User.find({ email });
  return users.length > 0;
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  initFirstUser,
};
