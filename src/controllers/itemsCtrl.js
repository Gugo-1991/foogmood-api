const Item = require("../models/item");

//GET api/v1/items
const getItems = async (req, res) => {
  Item.find()
    .then(async (items) => {
      res.status(200).send(items);
    })
    .catch((e) => {
      console.log(`Error getting all items`);
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
      console.log(`Error getting item id: ${id}`);
      res.status(500).send(e);
    });
};

//POST api/v1/items, BODY see Item model
const createItem = async (req, res) => {
  const item = req.body;
  const it = new Item(item);
  it.save()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

//PUT api/v1/items/:id, BODY see Item model
const updateItemById = async (req, res) => {
  const item = req.body;
  const { id } = req.params;
  Item.findByIdAndUpdate(
    { _id: id },
    { ...item, lastUpdateDate: Date.now() },
    { new: true }
  )
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

//DELETE api/v1/items/:id
const deleteById = async (req, res) => {
  const { id } = req.params;
  Item.deleteOne({ _id: id })
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItemById,
  deleteById,
};
