const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const companyRoutes  = require("./routes/companyRoutes");
const authenticateToken = require("./middleware/authenticateToken");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();


// Routes
app.use('/api/user', userRoutes);
app.use('/api/company', authenticateToken, companyRoutes);

app.get("/", (req, res) => {
  res.send("Hello World! Server is up and running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
