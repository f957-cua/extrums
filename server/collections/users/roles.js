const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
  value: { type: String, unique: true, default: "USER" },
});

const RoleModel = model("roles", RoleSchema);

module.exports = RoleModel;
