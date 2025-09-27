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
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => renderTask(task));

addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if(taskText === "") return;

    const task = {task: taskText, completed: false};
    tasks.push(task);
    saveTasks();
    renderTask(task);
    taskInput.value = "";
});

function renderTask(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    if(task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

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
        saveTasks;
    });

    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnContainer);
    taskList.appendChild(li);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



//calculator logic

// let currentValue = 0;
// let buffer = "0";


// const screen = document.querySelector(".screen");

// function buttonClick(value) {
//     if(isNaN(value)) {
//         handleOp(value);
//     } else {
//         handleNumber(value);
//     }

//     screen.innerText = buffer;
// }

// function handleOp(operator) {
//     switch(operator) {
//         case "AC":
//             buffer = "0";
//             currentValue = 0;
//             break;
//         case "=":
//     }
// }

const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".btn");

let exp = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if(value === "=") {
            try {
                screen.textContent = eval(exp);
                exp = screen.textContent;
            } catch {
                screen.textContent = "Error";
                exp = "";
            }
        } else if(value === "AC") {
            screen.textContent = "";
            exp = "";
        } else if(value === "del") {
            screen.textContent = screen.textContent.slice(0, -1);
            exp = exp.slice(0, -1);
        } else {
            //screen.textContent += value;
            
            const svg = button.querySelector("svg");
            const isOperator = ["+", "-", "*", "/"].includes(value);

            if(svg && isOperator) {
                screen.innerHTML += svg.outerHTML;
                exp += value;
            }else {
                //appends numbers as text nodes, keeps previous svg intact since textContent replaces all inner elementsbecause it contains only text
                //screen.textContent += value;
                screen.insertAdjacentText("beforeend", value); //adds texts in the end without affecting existing child elements
                exp += value;
            }
        }
    });
});

// function press(value) {
//     display.value += value;
// }

// function calculate() {
//     try {
//         display.value = eval(display.value);
//     } catch {
//         display.value = "Error";
//     }
// }

// function clearDisp() {
//     display.value = "";
// }