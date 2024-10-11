import { hideSkeletonLoader } from '../utils/hideSkeletonLoader.js';

class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskList = document.getElementById('task-list');
        if (!this.taskList) {
            console.error('Task list element not found');
        }
    }

    addTask(taskText, category) {
        const task = {
            id: Date.now(),
            text: taskText,
            category: category,
            completed: false
        };
        this.tasks.push(task);
        this.renderTasks();
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.renderTasks();
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
        }
    }

    renderTasks() {
        if (!this.taskList) return;
        
        this.taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <label>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="taskManager.toggleTaskCompletion(${task.id})">
                    <span>${task.text}</span>
                </label>
                <span class="category">${task.category}</span>
                <button onclick="taskManager.removeTask(${task.id})" aria-label="Remove task">×</button>
            `;
            this.taskList.appendChild(li);
        });

        this.updateTaskProgress();
        hideSkeletonLoader('tasks-widget'); 
    }

    updateTaskProgress() {
        if (!this.taskList) return;

        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
    }
}

// Create an instance of TaskManager
const taskManager = new TaskManager();

// Event listener for form submission
document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    
    if (taskInput.value.trim() !== '') {
        taskManager.addTask(taskInput.value, categoryInput.value);
        taskInput.value = '';
        categoryInput.value = '';
    }
});

// Initialize the task list when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => taskManager.renderTasks());
