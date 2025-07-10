const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const chartCtx = document.getElementById('expenseChart').getContext('2d');

let expenses = [];
let chart;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  expenses.push({ title, amount, category });
  updateList();
  updateChart();
  form.reset();
});

function updateList() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.textContent = `${expense.title} - ₹${expense.amount} (${expense.category})`;
    expenseList.appendChild(li);
  });
}

function updateChart() {
  const categorySums = {};

  expenses.forEach(exp => {
    categorySums[exp.category] = (categorySums[exp.category] || 0) + exp.amount;
  });

  const labels = Object.keys(categorySums);
  const data = Object.values(categorySums);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(chartCtx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Expenses by Category',
        data: data,
        backgroundColor: ['#f94144', '#f3722c', '#f9c74f', '#90be6d']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
