function showSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}


//const mainImg = document.getElementById("main-img");    both works this and the one below
const mainImg = document.querySelector("#main img");

const thumbnails = document.querySelectorAll(".thumbs img");

thumbnails.forEach(thumb => {
    thumb.addEventListener("click", function () {
        mainImg.src = thumb.src;
        mainImg.alt = thumb.alt;
    });
});

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