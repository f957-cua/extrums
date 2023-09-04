const { Schema, model } = require("mongoose");

const childSchema = new Schema({
  currentValue: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now() },
});

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String, default: "token" },
  currentValue: { type: Number, default: 5 },
  valueList: [childSchema],
  role: [{ type: String, refs: "Role" }],
});

const UserModel = model("users", UserSchema);

module.exports = UserModel;
