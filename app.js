//nav logic
function showSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

//image logic
//const mainImg = document.getElementById("main-img");    both works this and the one below
const mainImg = document.querySelector("#main img");

const thumbnails = document.querySelectorAll(".thumbs img");

thumbnails.forEach(thumb => {
    thumb.addEventListener("click", function () {
        mainImg.src = thumb.src;
        mainImg.alt = thumb.alt;
    });
});

//form logic
//getting data
const nameInput = document.querySelector("#fullName");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");


function validateForm() {

    clearMessages();

    let errorFlag = false;

    if(nameInput.value.length < 1){
        errorNodes[0].innerText = "Name cannot be empty";
        nameInput.classList.add("error-border");
        errorFlag = true;
    }

    if(!emailIsValid(email.value)){
        errorNodes[1].innerText = "Invalid email address";
        email.classList.add("error-border");
        errorFlag = true; 
    }

    if(message.value.length < 1){
        errorNodes[2].innerText = "Please enter message";
        message.classList.add("error-border");
        errorFlag = true;
    }

    if(!errorFlag){
        success.innerText = "Success!";
    }
}

function clearMessages(){
    for(let i = 0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    success.innerText = "";
    nameInput.classList.remove("error-border");
    email.classList.remove("error-border");
    message.classList.remove("error-border");
}

function emailIsValid(email){
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}




// To-Do List Logic

// const taskInput = document.getElementById("taskInput");
// const addBtn = document.getElementById("addBtn");
// const taskList = document.getElementById("taskList");

// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// tasks.forEach(task => renderTask(task));

// addBtn.addEventListener("click", () => {
//     const taskText = taskInput.value.trim();
//     if(taskText === "") return;

//     const task = {text: taskText, completed: false};
//     tasks.push(task);
//     saveTasks();
//     renderTask(task);
//     taskInput.value = "";
// });

// function renderTask(task) {
//     const li = document.createElement("li");
//     li.className = "task-item";
//     if(task.completed) li.classList.add("completed");

//     const span = document.createElement("span");
//     span.textContent = task.text;

//     const btnContainer = document.createElement("div");
//     btnContainer.className = "task-buttons";

//     const completeBtn = document.createElement("button");
//     completeBtn.textContent = "✓";
//     completeBtn.className = "complete-btn";
//     completeBtn.addEventListener("click", () => {
//         task.completed = !task.completed;
//         li.classList.toggle("completed");
//         saveTasks();
//     });

//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "✕";
//     deleteBtn.className = "delete-btn";
//     deleteBtn.addEventListener("click", () => {
//         tasks = tasks.filter(t => t !== task);
//         li.remove();
//         saveTasks;
//     });

//     btnContainer.appendChild(completeBtn);
//     btnContainer.appendChild(deleteBtn);

//     li.appendChild(span);
//     li.appendChild(btnContainer);
//     taskList.appendChild(li);
// }

// function saveTasks() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => renderTask(task));

// Add task on button click
addBtn.addEventListener("click", addTask);

// Add task on pressing Enter
taskInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if(taskText === "") return;

  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveTasks();
  renderTask(task);
  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.className = "task-item";
  if(task.completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = task.text;
  span.addEventListener("click", () => editTask(task, span));

  const btnContainer = document.createElement("div");
  btnContainer.className = "task-buttons";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.className = "complete-btn";
  completeBtn.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => t !== task);
    li.remove();
    saveTasks();
  });

  btnContainer.appendChild(completeBtn);
  btnContainer.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(btnContainer);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Edit task inline
function editTask(task, span) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  input.className = "edit-input";
  span.replaceWith(input);
  input.focus();

  // Save edited task on Enter or blur
  input.addEventListener("keypress", (e) => {
    if(e.key === "Enter") finishEdit();
  });
  input.addEventListener("blur", finishEdit);

  function finishEdit() {
    task.text = input.value.trim() || task.text;
    saveTasks();
    span.textContent = task.text;
    input.replaceWith(span);
  }
}

