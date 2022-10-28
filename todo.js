const tasks = document.getElementById('tasks');
// const todo = document.getElementById("to-do-container");
// const done = document.getElementById("done-container");

const check = () => { if (!localStorage.tasks) { localStorage.setItem('tasks', '[]'); } };

const appendHTML = (e, i) => {
  if (e.done === false) {
    tasks.innerHTML = `${tasks.innerHTML}
          <div class="single-to-do">
          <div class="to-do-task" onClick="makeDone(${i})" data-testid="todoItem">
          <h1 id="to-do-title-${i}">${e.title}</h1>
          <p id="to-do-desc-${i}">${e.desc}</p>
          </div>
          </div>
          `;
  } else {
    tasks.innerHTML = `${tasks.innerHTML}
          <div class="single-done todo__item--completed">
          <div class="done-task" onClick="makeUndone(${i})" data-testid="todoItem">
          <h1 id="done-title-${i}">${e.title}</h1>
          <p id="done-desc-${i}">${e.desc}</p>
          </div>
          <div class="align-right">
          <button id="remove-${i}" class="btn remove-btn" onClick="deleteTask(${i})" data-testid="btnDeleteTodo">Remove</button>
          </div>
          </div>
          `;
  }
};

const loadTasks = () => {
  check();
  tasks.innerHTML = '';
  // todo.innerHTML = '';
  // done.innerHTML = '';
  const task = JSON.parse(localStorage.tasks);

  task.forEach((e, i) => appendHTML(e, i));
};

const saveTask = () => {
  check();
  const titleForm = document.getElementById('txtTodoItemTitle').value;
  const descForm = document.getElementById('desc-form').value;
  if (titleForm) {
    const task = JSON.parse(localStorage.tasks);
    task.push({
      title: titleForm,
      desc: descForm,
      done: false,
    });
    localStorage.tasks = JSON.stringify(task);
    document.getElementById('txtTodoItemTitle').value = '';
    document.getElementById('desc-form').value = '';
    loadTasks();
  }
};

const deleteTask = (e) => {
  const task = JSON.parse(localStorage.tasks);
  task.splice(e, 1);
  localStorage.tasks = JSON.stringify(task);
  loadTasks();
};

const makeDone = (e) => {
  const task = JSON.parse(localStorage.tasks);
  task[e].done = true;
  localStorage.tasks = JSON.stringify(task);
  loadTasks();
};

const makeUndone = (e) => {
  const task = JSON.parse(localStorage.tasks);
  task[e].done = false;
  localStorage.tasks = JSON.stringify(task);
  loadTasks();
};

document.getElementById('btnAddTodo').addEventListener('click', saveTask);
loadTasks();