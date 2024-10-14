// Task list array
let taskList = [];

// Render task list
function renderTaskList() {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = '';
    taskList.forEach((task) => {
        const taskElement = document.createElement('li');
        taskElement.textContent = task.name;
        taskElement.dataset.taskId = task.id;
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskListElement.appendChild(taskElement);
    });
}

// Add task event listener
document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const taskDueDate = document.getElementById('task-due-date').value;
    const newTask = {
        id: Date.now(),
        name: taskName,
        dueDate: taskDueDate,
        completed: false,
    };
    taskList.push(newTask);
    renderTaskList();
    document.getElementById('task-name').value = '';
    document.getElementById('task-due-date').value = '';
});

// Edit task event listener
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const taskId = e.target.dataset.taskId;
        const task = taskList.find((task) => task.id === taskId);
        if (task) {
            const editForm = document.createElement('form');
            editForm.innerHTML = `
                <input type="text" value="${task.name}">
                <input type="datetime-local" value="${task.dueDate}">
                <button type="submit">Save</button>
            `;
            e.target.appendChild(editForm);
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                task.name = editForm.querySelector('input[type="text"]').value;
                task.dueDate = editForm.querySelector('input[type="datetime-local"]').value;
                renderTaskList();
            });
        }
    }
});

// Mark task as completed event listener
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const taskId = e.target.dataset.taskId;
        const task = taskList.find((task) => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            renderTaskList();
        }
    }
});

// Initialize task list
(function initializeTaskList() {
    const savedTaskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList = savedTaskList.map((task) => ({ ...task, completed: JSON.parse(task.completed) }));
    renderTaskList();
})();

// Save task list to local storage
function saveTaskList() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

// Update task list on changes
document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const taskId = e.target.closest('li').dataset.taskId;
        const task = taskList.find((task) => task.id === taskId);
        if (task) {
            task.completed = e.target.checked;
            saveTaskList();
        }
    }
});