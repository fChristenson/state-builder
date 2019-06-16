const app = require("./src/app");
const integrationApp = require("./src/app.integration");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/app", {
  useNewUrlParser: true
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Running server on port:", port);
  console.log("--------------------------");
});

const integrationAppPort = 3001;

integrationApp.listen(integrationAppPort, () => {
  console.log("Running server on port:", integrationAppPort);
  console.log("--------------------------");
})
