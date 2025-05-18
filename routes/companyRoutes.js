const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const Company = require("../models/Company");
const User = require("../models/User");

const router = express.Router();

// Join Company API (for Employees)
router.post("/join-company", authenticateToken, async (req, res) => {
  try {
    const { companyName, companyCode } = req.body;

    if (!companyName || !companyCode) {
      return res
        .status(400)
        .json({ message: "Company Name and Company Code are required" });
    }

    const company = await Company.findOne({ companyCode });
    if (!company) {
      return res.status(400).json({ message: "Company not found" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.company = company._id;
    await user.save();

    res.status(200).json({ message: "Successfully joined the company" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/create-company", authenticateToken, async (req, res) => {
  try {
    const { companyName, email, location, companySize, companyCode } = req.body;

    if (!companyName || !email || !location || !companySize || !companyCode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingCompany = await Company.findOne({ companyCode });
    if (existingCompany) {
      return res.status(400).json({ message: "Company code already exists" });
    }

    const company = new Company({
      companyName,
      email,
      location,
      companySize,
      companyCode,
    });

    await company.save();

    res.status(201).json({ message: "Company created successfully", company });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
