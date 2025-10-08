const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const transactionsStore = path.join(__dirname, "store", "transactions.json");
const debtsStore = path.join(__dirname, "store", "debts.json");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5174;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/back", (req, res) => {
  writeFileSync(
    transactionsStore,
    JSON.stringify(req.body.transactions, null, 2)
  );
  writeFileSync(debtsStore, JSON.stringify(req.body.debts, null, 2));
  res.status(200).json({ message: "Data saved" });
});

app.get("/api/transactions", (req, res) => {
  let transactions = JSON.parse(readFileSync(transactionsStore));
  res.status(200).json(transactions);
});
app.get("/api/debts", (req, res) => {
  let debts = JSON.parse(readFileSync(debtsStore));
  res.status(200).json(debts);
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
