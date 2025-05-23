const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
 
const app = express();
app.use(cors());
app.use(express.json());
 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
 
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
 
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);