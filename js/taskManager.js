class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.taskInput = document.getElementById('task-input');
        this.categoryInput = document.getElementById('category-input');
        this.taskList = document.getElementById('task-list');
        this.taskForm = document.getElementById('task-form');
        
        this.setupEventListeners();
        this.renderTasks();
    }

    setupEventListeners() {
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        const category = this.categoryInput.value.trim() || 'default';
        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false,
                category: category
            };
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
            this.taskInput.value = '';
            this.categoryInput.value = '';
        }
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task => 
            task.id === id ? {...task, completed: !task.completed} : task
        );
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        const categories = this.getCategories();
        
        const stats = this.getTaskStatistics();
        const statsElement = document.createElement('div');
        statsElement.className = 'task-statistics';
        statsElement.innerHTML = `
            <h3>Task Statistics</h3>
            <p>Total Tasks: ${stats.totalTasks}</p>
            <p>Completed Tasks: ${stats.completedTasks}</p>
            <p>Completion Rate: ${stats.completionRate}%</p>
        `;
        this.taskList.appendChild(statsElement);
        
        categories.forEach(category => {
            const categoryTasks = this.tasks.filter(task => task.category === category);
            if (categoryTasks.length > 0) {
                const categoryElement = document.createElement('div');
                categoryElement.className = 'task-category';
                categoryElement.innerHTML = `<h3>${category}</h3>`;
                
                const categoryList = document.createElement('ul');
                categoryTasks.forEach(task => {
                    const li = document.createElement('li');
                    li.className = 'task-item';
                    li.innerHTML = `
                        <label>
                            <input type="checkbox" ${task.completed ? 'checked' : ''}>
                            <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.text}</span>
                        </label>
                        <button onclick="taskManager.deleteTask(${task.id})">🗑️</button>
                    `;
                    const checkbox = li.querySelector('input');
                    checkbox.addEventListener('change', () => this.toggleTask(task.id));
                    categoryList.appendChild(li);
                });
                
                categoryElement.appendChild(categoryList);
                this.taskList.appendChild(categoryElement);
            }
        });
    }

    getCategories() {
        const categories = new Set(this.tasks.map(task => task.category));
        return Array.from(categories);
    }

    getTaskStatistics() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const completionRate = totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(2) : 0;

        return {
            totalTasks,
            completedTasks,
            completionRate
        };
    }
}

const taskManager = new TaskManager();