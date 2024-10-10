import { debounce } from '../utils/debounce.js';

class NoteManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.notesContainer = document.getElementById('notes-container');
        this.setupEventListeners();
        this.renderNotes();
    }

    setupEventListeners() {
        const addNoteBtn = document.getElementById('add-note-btn');
        addNoteBtn.addEventListener('click', () => this.addNote());
    }

    addNote() {
        const note = {
            id: Date.now(),
            content: ''
        };
        this.notes.push(note);
        this.saveNotes();
        this.renderNotes();
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    updateNote(id, content) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            note.content = content;
            this.saveNotes();
        }
    }

    debouncedUpdateNote = debounce(this.updateNote.bind(this), 500);

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    renderNotes() {
        this.notesContainer.innerHTML = '';
        this.notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <textarea>${note.content}</textarea>
                <button class="delete-note-btn">Delete</button>
            `;
            const textarea = noteElement.querySelector('textarea');
            textarea.addEventListener('input', () => {
                this.debouncedUpdateNote(note.id, textarea.value);
            });
            const deleteBtn = noteElement.querySelector('.delete-note-btn');
            deleteBtn.addEventListener('click', () => this.deleteNote(note.id));
            this.notesContainer.appendChild(noteElement);
        });
    }
}

const noteManager = new NoteManager();