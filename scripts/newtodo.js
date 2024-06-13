"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const userSelect = document.getElementById('users');
    const categorySelect = document.getElementById('categories');
    const todoForm = document.getElementById('todoForm');

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

    fetch('http://localhost:8083/api/categories')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        });

    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = {
            userid: userSelect.value,
            category: categorySelect.value,
            description: document.getElementById('description').value,
            deadline: document.getElementById('deadline').value,
            priority: document.getElementById('priority').value
        };

        fetch('http://localhost:8083/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(todo => {
            console.log('New ToDo added:', todo);
            alert('ToDo added successfully!');
        })
        .catch(error => console.error('Error:', error));
    });
});
