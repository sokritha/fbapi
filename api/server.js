const dotenv = require("dotenv");
const mongoose = require("mongoose");
const https = require('https');

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => {
    console.log("DB connection successful");
  });

const PORT = process.env.PORT || 4001;
const server = app.listen(PORT, () => {
  console.log("App is running on port ", PORT);
});

https.createServer()