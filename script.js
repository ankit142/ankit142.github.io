// Get elements
const editor = document.getElementById('editor');
const saveButton = document.getElementById('save-button');

// Event listener for the Save button
saveButton.addEventListener('click', () => {
    const userInput = editor.value;

    // Send a PUT request to save the user input on GitHub
    const githubUsername = 'ankit142'; // Replace with your GitHub username
    const repoName = 'ankit142.github.io'; // Replace with your repository name
    const token = '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'; // Replace with your personal access token
    const apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/note.txt`;

    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
            message: 'Update note.txt', // Commit message
            content: btoa(userInput), // Encode text to base64
            sha: 'https://github.com/ankit142/ankit142.github.io/raw/main/note.txt', // Get the SHA of the existing file from GitHub or create a new one
        }),
    })
        .then((response) => response.text())
        .then(() => {
            console.log('Text saved successfully');
        })
        .catch((error) => {
            console.error('Error saving user input:', error);
        });
});

// Function to load and display saved input from GitHub when the page loads
window.addEventListener('load', () => {
    // Send a GET request to load the saved user input from GitHub
    const githubUrl = `https://api.github.com/repos/ankit142/ankit142.github.io/note.txt`;

    fetch(githubUrl)
        .then((response) => response.json())
        .then((data) => {
            const decodedContent = atob(data.content); // Decode base64 content
            editor.value = decodedContent;
        })
        .catch((error) => {
            console.error('Error loading user input:', error);
        });
});
