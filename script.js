// Get elements
const editor = document.getElementById('editor');
const saveButton = document.getElementById('save-button');

// Event listener for the Save button
saveButton.addEventListener('click', () => {
    updateFile();
const userInput = editor.value;
const encodedInput = btoa(userInput);
const token = "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"; // Replace with your personal access token
const apiUrl = "https://api.github.com/repos/ankit142/ankit142.github.io/contents/note.txt";

const updateFile = async () => {
    const content = "SGVsbG8KYWJk"; // Content to update, in base64 format
    const sha = "e965047ad7c57865823c7d992b1d046ea66edf78"; // SHA of the existing file

    const requestBody = {
        message: 'Update note.txt', // Commit message
        content: encodedInput, // Content in base64
        sha: sha // SHA of the existing file
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': "application/vnd.github.v3+json",
                'Content-Type': "application/json"
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
    // Initialize GitHub with your personal access token
/* const github = new GitHub({
    token: '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', // Replace with your personal access token
});

// Get the repository
const repo = github.getRepo('ankit142', 'ankit142.github.io');

// Get the content of the existing file
repo.getContents('main', 'note.txt', true) // 'main' is the branch name
    .then((file) => {
        const userInput = editor.value;
        const content = btoa(userInput); // Encode text to base64

        // Commit the changes
        return repo.updateFile(
            'main',
            'note.txt',
            content,
            file.data.sha, // Use the SHA of the existing file
            'Update note.txt', // Commit message
        );
    })
    .then(() => {
        console.log('Text saved successfully');
    })
    .catch((error) => {
        console.error('Error saving user input:', error);
    }); */
/* const githubUsername = 'ankit142'; // Replace with your GitHub username
    const repoName = 'ankit142.github.io'; // Replace with your repository name
    const token = "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"; 
    
    const apiUrl = 'https://api.github.com/repos/ankit142/ankit142.github.io/contents/note.txt'// Replace with your personal access token
    const userInput = document.getElementById('editor').value;

// Encode user input to base64
const encodedInput = btoa(userInput);

// Create a message for the commit
const commitMessage = 'Update note.txt'; // You can customize the message

// Retrieve the existing file content and SHA (optional)
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const sha = data.sha; // SHA of the existing file (if it exists)

    // Create or update the file on GitHub
    fetch(apiUrl, {
      method: 'PUT', // Use 'POST' if you want to create a new file
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: encodedInput,
        sha: sha
      }),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log('Text saved successfully');
        } else {
          console.error('Failed to save text');
        }
      })
      .catch((error) => {
        console.error('Error saving user input:', error);
      });
  })
  .catch((error) => {
    console.error('Error retrieving existing file content:', error);
  });
 */
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
