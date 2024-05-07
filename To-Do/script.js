const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');
const summaryLine = document.getElementById('summary-line'); // Get the summary line element

function updateSummary() {
  const pendingTodos = pendingList.querySelectorAll('li').length;
  const completedTodos = completedList.querySelectorAll('li').length;
  const summaryText = `Summary: ${completedTodos} completed / ${pendingTodos} pending (${(completedTodos / (completedTodos + pendingTodos)).toFixed(2)} completed)`;
  summaryLine.textContent = summaryText;
}

function addTodo(text) {
  const newTodoItem = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      pendingList.removeChild(newTodoItem);
      completedList.appendChild(newTodoItem);
    } else {
      completedList.removeChild(newTodoItem);
      pendingList.appendChild(newTodoItem);
    }
    updateSummary(); // Update summary on checkbox change
  });
  const todoText = document.createTextNode(text);
  newTodoItem.appendChild(checkbox);
  newTodoItem.appendChild(todoText);
  pendingList.appendChild(newTodoItem);
  newTodoInput.value = '';
  updateSummary(); // Update summary after adding a new todo
}

addTodoButton.addEventListener('click', function() {
  const newTodoText = newTodoInput.value.trim();
  if (newTodoText.length > 0) {
    addTodo(newTodoText);
  }
});

// Call updateSummary on initial load to display initial summary
updateSummary();
