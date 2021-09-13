function createButton(idStr, textStr, taskFunc) {
  const button = document.createElement('button');
  const buttonsContainer = document.getElementById('buttons-container');

  button.id = idStr;
  button.innerText = textStr;
  button.className = 'nav-item'
  button.addEventListener('click', taskFunc);

  buttonsContainer.appendChild(button);
}

function selectTask(event) {
  const currentTask = document.getElementById('selected');

  if (currentTask) {
    currentTask.id = '';
  }  

  const selectedTask = event.target;
  selectedTask.id = 'selected';
}  

function toggleCompletion(event) {
  const selectedTask = event.target;

  if (selectedTask.className === 'completed') {
    selectedTask.className = '';
  } else {
    selectedTask.className = 'completed';
  }  
}  

function createTask(taskDescription, classString) {
  const newTask = document.createElement('li');
  const taskList = document.getElementById('lista-tarefas');

  newTask.innerText = taskDescription;
  newTask.className = classString;
  newTask.addEventListener('click', selectTask);
  newTask.addEventListener('dblclick', toggleCompletion);

  taskList.appendChild(newTask);
}  

function addTask() {
  const taskInput = document.getElementById('texto-tarefa');

  createTask(taskInput.value);
  taskInput.value = '';
}  

function removeSelectedTask() {
  const selectedTask = document.getElementById('selected');
  selectedTask.remove();
}

function removeDoneTasks() {
  const doneTasks = document.getElementsByClassName('completed');

  const index = 0;
  while (doneTasks.length > 0) {
    doneTasks[index].remove();
  }
}

function clearAll() {
  const taskList = document.getElementById('lista-tarefas');

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }  
}  

function moveTaskUp() {
  const selectedElement = document.getElementById('selected');

  if (selectedElement) {
    const targetElement = selectedElement.previousElementSibling;

    if (targetElement) {
      const selectedObject = transformElementToObject(selectedElement);
      const targetObject = transformElementToObject(targetElement);

      selectedElement.innerText = targetObject.text;
      selectedElement.className = targetObject.class;
      selectedElement.id = '';

      targetElement.innerText = selectedObject.text;
      targetElement.className = selectedObject.class;
      targetElement.id = 'selected';
    }
  }
}

function moveTaskDown() {
  const selectedElement = document.getElementById('selected');

  if (selectedElement) {
    const targetElement = selectedElement.nextElementSibling;

    if (targetElement) {
      const selectedObject = transformElementToObject(selectedElement);
      const targetObject = transformElementToObject(targetElement);

      selectedElement.innerText = targetObject.text;
      selectedElement.className = targetObject.class;
      selectedElement.id = '';

      targetElement.innerText = selectedObject.text;
      targetElement.className = selectedObject.class;
      targetElement.id = 'selected';
    }
  }
}

function transformElementToObject(element) {
  const Object = { text: element.innerText, class: element.className };

  return Object;
}  

function saveTasks() {
  localStorage.clear();
  const tasks = document.getElementsByTagName('li');
  const tasksArray = [];

  for (let index = 0; index < tasks.length; index += 1) {
    const taskObject = transformElementToObject(tasks[index]);

    tasksArray.push(taskObject);
  }  

  localStorage.setItem('taskList', JSON.stringify(tasksArray));
}  

function generateStoredTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('taskList'));

  if (storedTasks) {
    storedTasks.forEach((task) => {
      if (task.class) createTask(task.text, task.class);
    });
  }
}

window.onload = () => {
  createButton('criar-tarefa', 'Criar tarefa', addTask);
  createButton('remover-selecionado', 'Remover tarefa', removeSelectedTask);
  createButton('remover-finalizados', 'Remover finalizados', removeDoneTasks);
  createButton('apaga-tudo', 'Apagar tudo', clearAll);
  createButton('mover-cima', 'Mover para cima', moveTaskUp);
  createButton('mover-baixo', 'Mover para baixo', moveTaskDown);
  createButton('salvar-tarefas', 'Salvar', saveTasks);
  generateStoredTasks();
};
