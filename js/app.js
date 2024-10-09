class App {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.setupThemeToggle();
    }

    setupThemeToggle() {
        this.themeToggle.addEventListener('click', () => {
            document.body.dataset.theme = 
                document.body.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', document.body.dataset.theme);
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.dataset.theme = savedTheme;
        }
    }
}

const app = new App();