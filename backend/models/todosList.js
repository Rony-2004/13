const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("lists", todoSchema);