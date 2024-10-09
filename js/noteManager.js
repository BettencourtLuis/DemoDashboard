class NoteManager {
    constructor() {
        this.noteTextarea = document.getElementById('quick-note');
        this.loadNote();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.noteTextarea.addEventListener('input', () => {
            this.saveNote();
        });
    }

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