//calculator logic

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