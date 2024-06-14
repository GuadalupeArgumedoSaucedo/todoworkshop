"use strict"

// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    const userSelect = document.getElementById('users'); 
    const categorySelect = document.getElementById('categories'); 
    const todoForm = document.getElementById('todoForm'); 

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

    // Fetch category data from the API
    fetch('http://localhost:8083/api/categories')
        .then(response => response.json()) 
        .then(categories => {
            // Loop through each category, create option element for select menu
            categories.forEach(category => {
                const option = document.createElement('option'); 
                option.value = category; 
                option.textContent = category.name; 
                categorySelect.appendChild(option);
            });
        });

    // Add an event listener to form's submit event
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent from submitting traditional way

        // Create an object to hold the form data
        const data = {
            userid: userSelect.value, 
            category: categorySelect.value, 
            description: document.getElementById('description').value, 
            deadline: document.getElementById('deadline').value, 
            priority: document.getElementById('priority').value 
        };

        // Send the form data to the API
        fetch('http://localhost:8083/api/todos', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(data) 
        })
        .then(response => response.json()) 
        .then(todo => {
            console.log('New ToDo added:', todo); 
            alert('ToDo added successfully!'); // success message
        })
        .catch(error => console.error('Error:', error)); // Log any errors
    });
});

