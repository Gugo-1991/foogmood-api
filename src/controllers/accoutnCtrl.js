const Account = require("../models/account");

//GET api/v1/account/:userId
const getUserAccount = async (req, res) => {
  const { userId } = req.params;
  Account.findOne({ userId }).then((accoutn) => {
    if (accoutn) {
      res.status(200).send(accoutn);
    } else {
      res.status(403).send({ message: `Account not found user id: ${userId}` });
    }
  });
};
//PUT api/v1/account/:userId/:amount
const fillUserBalance = async (req, res) => {
  const { userId, amount } = req.params;
  if (isNaN(amount)) {
    res
      .status(500)
      .send({ message: `Amount should be number, instead it is: ${amount}` });
  }
  Account.findOne({ userId }).then((account) => {
    if (account) {
      account.balance += parseFloat(amount);
      account.save().then((account) => {
        res.status(200).send(account);
      });
    } else {
      res.status(403).send({ message: `Account not found user id: ${userId}` });
    }
  });
};

module.exports = {
  getUserAccount,
  fillUserBalance,
};
