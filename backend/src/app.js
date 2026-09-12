'use strict'

const express = require("express");
const cors = require("cors");

const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Business Playbook API is running",
  });
});

app.use("/api/payment", paymentRoutes);

module.exports = app;