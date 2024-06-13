"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const userSelect = document.getElementById('users');
    const todosTable = document.getElementById('todosTable').querySelector('tbody');

    fetch('http://localhost:8083/api/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        });

    userSelect.addEventListener('change', function () {
        const userId = userSelect.value;
        fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
            .then(response => response.json())
            .then(todos => {
                todosTable.innerHTML = '';
                todos.forEach(todo => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${todo.description}</td>
                        <td>${todo.deadline}</td>
                        <td>${todo.priority}</td>
                        <td>${todo.completed ? '✔️' : '❌'}</td>
                    `;
                    todosTable.appendChild(row);
                });
            });
    });
});
