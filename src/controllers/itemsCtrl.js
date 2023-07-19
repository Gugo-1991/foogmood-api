const Item = require("../models/item");

//GET api/v1/items
const getItems = async (req, res) => {
  Item.find()
    .then(async (items) => {
      res.status(200).send(items);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

//GET api/v1/items/:id
const getItemById = async (req, res) => {
  const { id } = req.params;
  Item.findById(id)
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

//POST api/v1/items, BODY see Item model
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
