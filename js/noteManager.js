import { debounce } from '../utils/debounce.js';

class NoteManager {
    constructor() {
        this.noteTextarea = document.getElementById('quick-note');
        this.loadNote();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.noteTextarea.addEventListener('input', () => {
            this.debouncedSaveNote();
        });
    }

    debouncedSaveNote = debounce(this.saveNote, 500);

    saveNote() {
        localStorage.setItem('quickNote', this.noteTextarea.value);
    }

    loadNote() {
        const savedNote = localStorage.getItem('quickNote');
        if (savedNote) {
            this.noteTextarea.value = savedNote;
        }
    }
}

const noteManager = new NoteManager();