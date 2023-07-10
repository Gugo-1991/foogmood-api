const Item = require("../models/item");

const getItems = async (req, res) => {
  Item.find().then(async (items) => {
    res.status(200).send(items);
  });
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  Item.findById(id)
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      console.log(`Error getting item id: ${id}`);
      res.status(500).send(e);
    });
};

const createItem = async (req, res) => {
  const { item } = req.body;
  Item.save(item)
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

module.exports = {
  getItems,
  getItemById,
  createItem,
};
