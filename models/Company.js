const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  companySize: { type: String, required: true },
  companyCode: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Company", companySchema);
