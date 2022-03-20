const express = require("express");
const app = express();
const cors = require("cors");
const Card = require("./db/models/card");
const { v4: uuidv4 } = require("uuid");
const ruid = require("express-ruid")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(ruid())
app.post("/payment", async (req, res) => {
  const newPayment = new Card({
    cardNumber: req.body.cardNumber,
    expDate: req.body.expDate,
    cvv: req.body.cvv,
    amount: req.body.amount,
  });
  await newPayment.save();
  res.json({requesId:req.rid ,amount: req.body.amount});
});

module.exports = app;
