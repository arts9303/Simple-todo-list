const addBtn = document.getElementById('task-add__btn');
const addInput = document.getElementById('task-add__text');
const taskWrap = document.querySelector('.task-list');

let tasks ;

let elems = [];

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function task(description) {
    this.description = description;
    this.completed = false;
}

const cTemplate = (task,index) => {
    return `
    <div class="task-item ${task.completed ? 'checked' : ''}">
        <div class="task-text">${task.description}</div>
        <div class="task-control">
            <label for="add-input${index}" class="add-input-label">
                <input id="add-input${index}" onclick="completeTask(${index})" class="task-finished task-checkbox" type="checkbox" ${task.completed ? 'checked' : ''}>
                ${task.completed ? 'Выполнено' : 'Закончить'}
            </label>    
            <button onclick="deleteTask(${index})" class="task-delete">Удалить</button>
        </div>
    </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}

const fillHtml = () => {
    taskWrap.innerHTML = '';

    if(tasks.length > 0){
        filterTasks();
        tasks.forEach( (item,index) => {
            taskWrap.innerHTML += cTemplate(item,index);
        });

        elems = document.querySelectorAll('.task-item');
    }
    
}

fillHtml();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        elems[index].classList.add('checked');
    } else {
        elems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtml();
}

addBtn.addEventListener('click', () => {
    tasks.push(new task(addInput.value));
    updateLocal();
    addInput.value = '';
    fillHtml();
});

document.querySelector('#task-add__text').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        tasks.push(new task(addInput.value));
        updateLocal();
        addInput.value = '';
        fillHtml();
    }
});

const deleteTask = (index) => {
    elems[index].classList.add('delete-item');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtml();
    }, 400)
}