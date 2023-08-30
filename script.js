// Get elements
const editor = document.getElementById('editor');
const saveButton = document.getElementById('save-button');

// Event listener for the Save button
saveButton.addEventListener('click', () => {
    const userInput = editor.value;

    // Send a POST request to save the user input on the server
    fetch('/save', {
        method: 'POST',
        body: `userInput=${userInput}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => response.text())
        .then((data) => {
            console.log(data); // Log the server's response
        })
        .catch((error) => {
            console.error('Error saving user input:', error);
        });
});

// Function to load and display saved input from the server when the page loads
window.addEventListener('load', () => {
    // Send a GET request to load the saved user input from the server
    fetch('/load')
        .then((response) => response.text())
        .then((data) => {
            editor.value = data;
        })
        .catch((error) => {
            console.error('Error loading user input:', error);
        });
});
