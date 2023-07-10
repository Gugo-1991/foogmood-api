const express = require("express");
const Config = require("./config.json");
const mongoose = require("mongoose");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "250mb" }));
app.use(bodyParser.urlencoded({ limit: "250mb", extended: true }));

mongoose
  .connect(Config.mongodbUri)
  .then(() => {
    console.log("successfully connected to mongodb");
  })
  .catch((err) => {
    console.error(err);
  });

app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Feature-Policy",
    " geolocation self; camera none; fullscreen *"
  );
  next();
});

const usersRoute = require("./src/routes/users");
const authRoute = require("./src/routes/auth");

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .send({ status: "Food mood api is running", version: Config.API_VERSION });
});

http
  .createServer(app)
  .listen(Config.port || 5000, () => {
    console.log(`Server is running on PORT: ${Config.port || 5000}`);
  })
  .setTimeout(6000000);
