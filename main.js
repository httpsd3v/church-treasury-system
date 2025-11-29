function loadReports() {
    const reportBody = document.getElementById('reportBody');
    const storedData = localStorage.getItem('churchTransactions');

if (!storedData) {
    reportBody.innerHTML = '<tr><td colspan="4">No transactions saved yet.</td></tr>';
    return;
}

const transactions = JSON.parse(storedData);
let grandTotal = 0;

transactions.forEach(transaction => {
    const row = document.createElement('tr');
    const dateObj = new Date(transaction.date);

row.innerHTML = `
    <td>${transaction.name}</td>
    <td>${transaction.type}</td>
    <td class="amount-cell">${parseFloat(transaction.amount).toFixed(2)}/=</td>
    <td>${dateObj.toLocaleString()}</td>
`;
reportBody.appendChild(row);
    grandTotal += parseFloat(transaction.amount);
});
    document.getElementById('reportTotal').textContent = grandTotal.toFixed(2) + '/=';
}

function clearReports() {
    if (confirm("Are you sure you want to clear all saved transaction data? This cannot be undone.")) {
    localStorage.removeItem('churchTransactions');
    loadReports(); 
}
}
document.addEventListener('DOMContentLoaded', loadReports);