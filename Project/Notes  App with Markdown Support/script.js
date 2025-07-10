const notesList = document.getElementById("notes-list");
const newNoteBtn = document.getElementById("new-note");
const template = document.getElementById("note-template");

function createNote(content = '') {
  const note = template.content.cloneNode(true);
  const textarea = note.querySelector('.markdown-input');
  const preview = note.querySelector('.preview');
  const saveBtn = note.querySelector('.save-note');
  const deleteBtn = note.querySelector('.delete-note');

  textarea.value = content;
  preview.innerHTML = marked.parse(content);

  textarea.addEventListener('input', () => {
    preview.innerHTML = marked.parse(textarea.value);
  });

  saveBtn.addEventListener('click', () => {
    saveNotes();
  });

  deleteBtn.addEventListener('click', (e) => {
    e.target.closest('.note').remove();
    saveNotes();
  });

  notesList.appendChild(note);
}

function saveNotes() {
  const notes = Array.from(document.querySelectorAll('.markdown-input')).map(input => input.value);
  localStorage.setItem('markdown-notes', JSON.stringify(notes));
}

function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('markdown-notes') || '[]');
  savedNotes.forEach(noteContent => createNote(noteContent));
}

newNoteBtn.addEventListener('click', () => createNote());

window.addEventListener('load', loadNotes);
