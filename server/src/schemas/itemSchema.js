const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bidder: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('auctionItems', itemSchema);
