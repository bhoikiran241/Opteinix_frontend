const express = require("express");
const cors = require("cors");
require("dotenv").config();

const paymentRoutes = require("./routes/paymenttRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Payment Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
