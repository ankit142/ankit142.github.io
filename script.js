// Array to store notes
const notes = [];

// Elements
const notesContainer = document.getElementById('notes-container');
const editor = document.getElementById('editor');
const saveButton = document.getElementById('save-button');

// Function to render notes
function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <div class="note-header">
                <h3>Note ${index + 1}</h3>
                <button class="delete-button" onclick="deleteNote(${index})">Delete</button>
            </div>
            <div class="note-content">${note}</div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function manualSave() {
    saveNote(); // Call the existing saveNote function
}
const manualSaveButton = document.getElementById('save-button');
manualSaveButton.addEventListener('click', manualSave);

function saveNote() {
    const newNote = editor.value.trim();
    if (newNote !== '') {
        notes.push(newNote);
        renderNotes();
        editor.value = '';

        // Perform a POST request to your serverless function in the .netlify directory
        fetch('/.netlify/functions/saveNote', {  // Update the path here
            method: 'POST',
            body: JSON.stringify({ note: newNote }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.message); // Log the server's response
            })
            .catch((error) => {
                console.error('Error saving note:', error);
            });
    }
}

// Automatically save the note every 10 seconds
setInterval(() => {
    saveNote();
}, 10000);

// Function to save a new note


// Function to delete a note
function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

// Event listeners
//saveButton.addEventListener('click', saveNote);

// Initial render
//renderNotes();
