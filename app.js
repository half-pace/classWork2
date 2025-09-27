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