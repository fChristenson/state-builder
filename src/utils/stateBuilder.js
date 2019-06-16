const axios = require("axios");

const Command = (url, body) => {
  return {
    url,
    body
  };
};

/**
 * You may ask, why not just use the models directly since it is all in JavaScript?
 * The reason is that I if we where running the server in a different language than JavaScript
 * we can still use the same interface for the cypress tests.
 */
module.exports = class StateBuilder {
  constructor() {
    this.commands = [];
  }

  createUser(props = {}) {
    const body = {};
    body.name = props.name || "Test" + Math.floor(Math.random() * 1000);
    body.age = props.age || Math.floor(Math.random() * 100);
    body.createdAt = props.createdAt || undefined;
    this.commands.push(Command("http://localhost:3001/users", body));
    return this;
  }

  createBook(props = {}) {
    const body = {};
    body.name = props.name || "Test" + Math.floor(Math.random() * 1000);
    body.createdAt = props.createdAt || undefined;
    this.commands.push(Command("http://localhost:3001/books", body));
    return this;
  }

  createOrder(props = {}) {
    const body = {};
    body.userId = props.userId || "Test" + Math.floor(Math.random() * 1000);
    body.books = props.books || [];
    body.createdAt = props.createdAt || undefined;
    this.commands.push(Command("http://localhost:3001/orders", body));
    return this;
  }

  clear(q = "all") {
    return axios.delete(`http://localhost:3001/clear?q=${q}`);
  }

  execute() {
    const promises = this.commands.map(cmd => axios.post(cmd.url, cmd.body));
    this.commands = [];
    return Promise.all(promises).then(responses => {
      return responses.map(res => res.data);
    });
  }
}