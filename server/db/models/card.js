const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardNumber: { type: String, require: true },
  expDate: { type: String, require: true },
  cvv: { type: String, require: true },
  amount: { type: String, require: true },
});
const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
