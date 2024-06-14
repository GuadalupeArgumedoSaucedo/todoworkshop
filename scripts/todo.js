"use strict"

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    const userSelect = document.getElementById('users');
    const todosTable = document.getElementById('todosTable').querySelector('tbody');

    // Fetch user data from the API
    fetch('http://localhost:8083/api/users')
        .then(response => response.json())
        .then(users => {
            // Loop through each user, create option element for select menu
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        });

    // Add an event listener to the user select menu's change event
    userSelect.addEventListener('change', function () {
        const userId = userSelect.value;
        // Fetch todo data for the selected user from the API
        fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
            .then(response => response.json())
            .then(todos => {
                todosTable.innerHTML = '';// Clear
                // Loop through each todo, create a row in the table
                todos.forEach(todo => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${todo.description}</td>
                        <td>${todo.deadline}</td>
                        <td>${todo.priority}</td>
                        <td>${todo.completed ? '✔️' : '❌'}</td>
                    `;
                    todosTable.appendChild(row);// Add the row to the table body
                });
            });
    });
});
