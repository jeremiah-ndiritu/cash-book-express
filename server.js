const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const transactionsStore = path.join(__dirname, "store", "transactions.json");
const debtsStore = path.join(__dirname, "store", "debts.json");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5174;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/back", (req, res) => {
  const { transactions, debts } = req.body;
  if (existsSync(transactionsStore)) {
    writeFileSync(transactionsStore, JSON.stringify(transactions, null, 2));
  }
  if (existsSync(debtsStore)) {
    writeFileSync(debtsStore, JSON.stringify(debts, null, 2));
  }
});

app.get("/api/transactions", (req, res) => {
  let transactions = require("./store/transactions.json");
  res.status(200).json(transactions);
});
app.get("/api/debts", (req, res) => {
  let debts = require("./store/debts.json");
  res.status(200).json(debts);
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
