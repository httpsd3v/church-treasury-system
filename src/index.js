function calculateTotal() {
    let total = 0;
    const amountCells = document.querySelectorAll('#tableBody .amount-cell');
    amountCells.forEach(cell => {
        const amountText = cell.textContent.replace('/=', '').trim();
        const amount = parseFloat(amountText);
            if (!isNaN(amount)) {
                total += amount;
            }
            });
        document.getElementById('grandTotal').textContent = total.toFixed(2) + '/=';
}

function addRow() {
    const nameValue = document.getElementById("Name").value;
    const typeValue = document.getElementById("type-select").value;
    const amountValue = document.getElementById("Amount").value;
if (!nameValue || !typeValue || !amountValue) {
    alert("Please fill in all Name, Type, and Amount fields.");
    return; 
}

const tableBody = document.getElementById("tableBody");

const newRowHTML = `
    <tr>
    <td contenteditable="true" style="border: 1px solid #ddd; padding: 8px;">${nameValue}</td>
    <td contenteditable="true" style="border: 1px solid #ddd; padding: 8px;">${typeValue}</td>
    <td contenteditable="true" class="amount-cell" style="border: 1px solid #ddd; padding: 8px;">${parseFloat(amountValue).toFixed(2)}/=</td>
    </tr>
`;   

    tableBody.insertAdjacentHTML('beforeend', newRowHTML);
    calculateTotal();

    document.getElementById("Name").value = '';
    document.getElementById("Amount").value = '';
    document.getElementById("type-select").value = '';
    document.getElementById("Name").focus();
}

function saveTransactionData() {
    const rows = document.querySelectorAll('#tableBody tr');
    const transactions = [];

rows.forEach(row => {
        const cells = row.querySelectorAll('td');
    if (cells.length === 3) {
        transactions.push({
        name: cells[0].textContent.trim(),
        type: cells[1].textContent.trim(),
        amount: cells[2].textContent.replace('/=', '').trim(),
        date: new Date().toISOString()
    });
}
});
const existingData = JSON.parse(localStorage.getItem('churchTransactions')) || [];
    existingData.push(...transactions);
    localStorage.setItem('churchTransactions', JSON.stringify(existingData));
    alert(`Saved ${transactions.length} transactions to report data!`);
    document.getElementById("tableBody").innerHTML = '';
    calculateTotal();
}

document.addEventListener("DOMContentLoaded", (event) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    document.getElementById("current-date").textContent = formattedDate;
    calculateTotal();
});

let hrs = document.getElementById('hrs');
let min = document.getElementById('min');

setInterval(() => {
    let currentTIME = new Date();
    hrs.innerHTML = (currentTIME.getHours() < 10 ? "0" : "") + currentTIME.getHours();
    min.innerHTML = (currentTIME.getMinutes() < 10 ? "0" : "") + currentTIME.getMinutes();
}, 1000);