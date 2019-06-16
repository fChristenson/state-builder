const express = require("express");
const cors = require("cors");
const UserModel = require("./models/User");
const BookModel = require("./models/Book");
const OrderModel = require("./models/Order");
const app = express();

app.use(express.json());

app.use(cors());

app.post("/users", async (req, res) => {
  const user = await UserModel.create(req.body);
  res.json(user);
});

app.post("/books", async (req, res) => {
  const book = await BookModel.create(req.body);
  res.json(book);
});

app.post("/orders", async (req, res) => {
  const orders = await OrderModel.create(req.body);
  res.json(orders);
});

app.delete("/clear", async (req, res) => {
  switch (req.query.q) {
    case "book":
      await BookModel.deleteMany({});
      break;

    case "user":
      await UserModel.deleteMany({});
      break;

    case "order":
      await OrderModel.deleteMany({});
      break;
  
    default:
      await OrderModel.deleteMany({});
      await UserModel.deleteMany({});
      await BookModel.deleteMany({});
      break;
  }

  res.json();
});

module.exports = app;
