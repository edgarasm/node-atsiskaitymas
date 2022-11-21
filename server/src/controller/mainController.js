const userSchema = require('../schemas/userSchema');
const itemSchema = require('../schemas/itemSchema');
const bcrypt = require('bcrypt');
const { uid } = require('uid');

module.exports = {
  register: async (req, res) => {
    const { username, pass1: password } = req.body;

    const userExists = await userSchema.findOne({ username });
    if (userExists) return res.send({ error: true, message: 'user exists', data: null });

    // REGISTER NEW USER
    const hash = await bcrypt.hash(password, 10);

    const secret = uid(30);
    const newUser = new userSchema({ username, password: hash, secret });
    await newUser.save();

    res.send({ error: false, message: null, data: newUser });
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const userExists = await userSchema.findOne({ username });

    if (userExists) {
      if (await bcrypt.compare(password, userExists.password)) {
        return res.send({
          error: false,
          message: null,
          data: {
            secret: userExists.secret,
            username: userExists.username,
          },
        });
      } else {
        return res.send({ error: true, message: 'bad credentials', data: null });
      }
    }
    res.send({ error: true, message: 'bad credentials', data: null });
  },

  auction: async (req, res) => {
    const items = await itemSchema.find();

    res.send({ error: false, message: 'items found', data: items });
  },
  addItem: async (req, res) => {
    const { image, title, time, price } = req.body;

    const newItem = new itemSchema({ image, title, time, price });

    await newItem.save();

    res.send({ error: false, message: 'item added', data: newItem });
  },
  singleItem: async (req, res) => {
    const { id } = req.params;

    const item = await itemSchema.findOne({ _id: id });
    console.log('item ===', item);
    res.send({ error: false, message: 'item found', data: item });
  },
  updateBid: async (req, res) => {
    const { itemId, bidder, price } = req.body;
    const item = await itemSchema.findOneAndUpdate(
      { _id: itemId },
      { bidder: bidder, price: price }
    );

    res.send(item);
  },
};
