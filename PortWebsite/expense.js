let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expenses-table-body');
const totalAmountCell = document.getElementById('total-amount');  // This is the Total row cell

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Create an expense object
    const expense = { category, amount, date };
    expenses.push(expense);

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;  // Update total amount in footer

    // Create new row in the table
    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const dateCell = newRow.insertCell(); // Date comes before Amount now
    const amountCell = newRow.insertCell(); // Amount comes after Date now
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    dateCell.textContent = expense.date; // Display date first
    amountCell.textContent = expense.amount; // Display amount second

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        // Find the index of the expense object in the array
        const index = expenses.findIndex(exp => 
            exp.category === expense.category && 
            exp.amount === expense.amount && 
            exp.date === expense.date
        );

        if (index !== -1) {
            // Remove the expense from the array
            expenses.splice(index, 1);

            // Update the total amount
            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;  // Update the total in the footer

            // Remove the row from the table
            expensesTableBody.removeChild(newRow);

            // If no expenses are left, reset the total amount to 0
            if (expenses.length === 0) {
                totalAmount = 0;
                totalAmountCell.textContent = totalAmount;  // Reset total amount to 0
            }
        }
    });

    deleteCell.appendChild(deleteBtn);
});
