const editor = document.getElementById('editor');
const saveButton = document.getElementById('save-button');

// Event listener for the Save button
saveButton.addEventListener('click', () => {
    const userInput = editor.value;
    const encodedInput = btoa(userInput);

    const token = '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';
    const apiUrl = 'https://api.github.com/repos/ankit142/ankit142.github.io/contents/note.txt';

    const updateFile = async () => {
        const sha = 'e965047ad7c57865823c7d992b1d046ea66edf78'; // SHA of the existing file (replace with the correct SHA)

        const requestBody = {
            message: 'Update note.txt', // Commit message
            content: encodedInput, // Content in base64
            sha: sha // SHA of the existing file
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token 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`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                console.log('File updated successfully');
            } else {
                console.error('Failed to update file:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error updating file:', error);
        }
    };

    // Call the function to update the file
    updateFile();
});

// Function to load and display saved input from GitHub when the page loads
window.addEventListener('load', () => {
    // Send a GET request to load the saved user input from GitHub
    const githubUrl = 'https://api.github.com/repos/ankit142/ankit142.github.io/contents/note.txt';

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
