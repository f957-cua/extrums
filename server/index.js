const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./router/authRouter.js");
const counterRouter = require("./router/counterRouter.js");
const PORT = process.env.PORT || 3001;
const { MONGO_URI } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});

app.use("/auth", authRouter);
app.use("/", counterRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res
    .status(status)
    .json({ status: "fail", code: status, message: err.message });
});

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB successfully connected");
    app.listen(PORT, () => {
      console.log(`server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
