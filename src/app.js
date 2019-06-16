const express = require("express");
const OrderModel = require("./models/Order");
const UserModel = require("./models/User");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

app.get("/", async (req, res) => {
  const users = await UserModel.find({});
  res.setHeader("Content-Type", "text/html");
  res.send(html(users));
});

app.get("/orders/:userId", async (req, res) => {
  const orders = await OrderModel.find({userId: req.params.userId});
  res.json(orders);
});

const html = (users) => {
  return `
    <html>
      <body>
        <h1>foo</h1>
        <ul>${users.map(u => `<li>${u.name}</li>`).join("")}</ul>
      </body>
    </html>
  `;
};

module.exports = app;
