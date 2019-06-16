const app = require("../app");
const integrationApp = require("../app.integration");
const StateBuilder = require("../utils/stateBuilder");
const axios = require("axios");
const mongoose = require("mongoose");

const builder = new StateBuilder();

describe("App test", () => {
  let server;
  let db;
  let integrationServer;

  beforeAll(async () => {
    db = await mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/test", {
      useNewUrlParser: true
    });
    server = await app.listen(3000);
    integrationServer = await integrationApp.listen(3001);
  });

  afterAll(async () => {
    await builder.clear();
    await server.close();
    await integrationServer.close();
    await db.close();
  });

  afterEach(async () => {
    await builder.clear();
  });

  it("should return empty array if no order is placed", async () => {
    const [user] = await builder.createUser().createBook().execute();
    const res = await axios.get(`http://localhost:3000/orders/${user._id}`);
    expect(res.data.length).toEqual(0);
  });

  it("should get all orders for a user", async () => {
    const [user, book1, book2, book3] = await builder.createUser()
      .createBook()
      .createBook()
      .createBook()
      .execute();
    const books = [book1._id, book2._id, book3._id];
    await builder.createOrder({userId: user._id, books}).execute();
    const res = await axios.get(`http://localhost:3000/orders/${user._id}`);
    expect(res.data.length).toEqual(1);
    const order = res.data[0];
    expect(order.userId).toEqual(user._id);
    expect(order.books.length).toEqual(3);
  });
});
