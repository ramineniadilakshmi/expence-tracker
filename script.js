const form = document.querySelector('#expense-form');
const tableBody = document.querySelector('#expense-table-body');

form.addEventListener('submit', e => {
  e.preventDefault();

  const amount = form.amount.value;
  const description = form.description.value;
  const category = form.category.value;

  const expense = { amount, description, category };

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  form.reset();

  renderExpenses();
});

const renderExpenses = () => {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  tableBody.innerHTML = '';
  expenses.forEach(expense => {
    const tr = document.createElement('tr');

    const amountTd = document.createElement('td');
    amountTd.innerText = expense.amount;
    tr.appendChild(amountTd);

    const descriptionTd = document.createElement('td');
    descriptionTd.innerText = expense.description;
    tr.appendChild(descriptionTd);

    const categoryTd = document.createElement('td');
    categoryTd.innerText = expense.category;
    tr.appendChild(categoryTd);

    const actionsTd = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.className = 'btn btn-primary';
    editButton.style.backgroundColor = '#0fa3b1';
    editButton.addEventListener('click', () => {
      form.amount.value = expense.amount;
      form.description.value = expense.description;
      // form.description.defaultValue = expense.description;
      form.category.value = expense.category;
      
      expenses = expenses.filter(item => item.description !== expense.description);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
    })

    actionsTd.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'btn btn-danger mx-2';
    deleteButton.style.backgroundColor = '#ef6f6c';

    deleteButton.addEventListener('click', () => {
      expenses = expenses.filter(item => item.description !== expense.description);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
    });
    actionsTd.appendChild(deleteButton);
    tr.appendChild(actionsTd);

    tableBody.appendChild(tr);
  });
};

renderExpenses();