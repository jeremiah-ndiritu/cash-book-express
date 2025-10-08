const backendURL = "http://localhost:5174";
const transactionsDiv = document.getElementById("transactions");
const debtssDiv = document.getElementById("debts");

async function loadData() {
  let { debts, transactions } = await getData();

  transactions.forEach((t) => {
    let e = document.createElement("div");
    e.className = "tx";
    e.innerHTML = `
            <h5>ID : ${t.id} </h5>
            <p>${t.description}</p>
        `;
    transactionsDiv.appendChild(e);
  });
}
loadData();
async function getData() {
  let debts = await getDebts();
  let transactions = await getTransactions();

  return { debts, transactions };
}
async function getTransactions() {
  let res = await fetch(`${backendURL}/api/transactions`);
  let transactions = await res.json();
  return transactions || [];
}
async function getDebts() {
  let res = await fetch(`${backendURL}/api/debts`);
  let debts = await res.json();
  return debts || [];
}
