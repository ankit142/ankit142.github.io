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

// Function to save a new note
function saveNote() {
    const newNote = editor.value.trim();
    /* if (newNote !== '') {
        notes.push(newNote);
        renderNotes();
        editor.value = '';
    } */
}

// Function to delete a note
function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

// Event listeners
saveButton.addEventListener('click', saveNote);

// Initial render
renderNotes();
