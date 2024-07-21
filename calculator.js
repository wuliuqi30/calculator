// Calculator Operations:
const add = function (a, b) {
    return a + b;
};

const subtract = function (a, b) {
    return a - b;
};

const multiply = function (a, b) {
    return a * b;
};

const divide = function (a, b) {
    if (!b) {
        return "DIVIDE BY ZERO ERROR";
    } else {
        return a / b;
    }
};

// Mini Tests
console.log(add(1, 1));
console.log(subtract(-3, 1));
console.log(multiply(0, 0));
console.log(multiply(0, 1));
console.log(multiply(90, 2));
console.log(divide(1, 0));
console.log(divide(0, 1));
console.log(divide(2, 9));


const operate = function (a, b, func) {
    return func(a, b)
};

// Monkey around with some things:

let a = 3;
let b = 5;
let c = operate(a,b,add);
console.log(` operate(a,b,add) gives ${c}`);

// Do not edit below this line
// module.exports = {
//     add,
//     subtract,
//     multiply,
//     divide,
//     operate
//   };


const appendInDisplayWindow = function (char) {
    // Input should be a string, typically a single character
    if (calculatorState.operationButtonJustPressed) {
        let displayWindow = document.querySelector(".display");
        displayWindow.value = char;
        calculatorState.operationButtonJustPressed = false;
    } else {
        let displayWindow = document.querySelector(".display");
        displayWindow.value += char;
    }
}

// Create Calculator In Javascript: 

const body = document.querySelector('body');

// Global Object Holding Important State Variables::
const calculatorState = {
    operationButtonJustPressed: false,
    operationToBeUsed: null,
    firstNumber: null,
    secondNumber: null
}

let operationButtonJustPressed = false;
let operationToBeUsed = null;

let firstNumber = null;
let secondNumber = null;



// Create 10 buttons

for (i = 0; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button")
    btn.textContent = i;

    // Event listeners

    btn.addEventListener("click", () => {
        appendInDisplayWindow(btn.textContent)
    });



    body.appendChild(btn);


}

// Create Buttons for the operations
const numOperations = 4;
const operationsList = ['add', 'subtract', 'multiply', 'divide']
for (i = 0; i < numOperations; i++) {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button")
    btn.textContent = operationsList[i];
    body.appendChild(btn);

    btn.addEventListener("click", () => {
        operationButtonJustPressed = true;
        let displayWindow = document.querySelector(".display");
        calculatorState.firstNumber = Number(displayWindow.value);
        calculatorState.operationToBeUsed = btn.textContent;
        console.log(`operation to be used is set: ${calculatorState.operationToBeUsed}`)

    })
}

// Create Clear Button

const clrbtn = document.createElement("button");
clrbtn.setAttribute("class", "button");
clrbtn.textContent = "Clear";
clrbtn.addEventListener("click", () => {
    let displayWindow = document.querySelector(".display");
    displayWindow.value = '';
}
)

// Create Compute Button (=)
const computeBtn = document.createElement("button");
computeBtn.setAttribute("class", "button");
computeBtn.textContent = "=";
computeBtn.addEventListener("click", () => {
    let displayWindow = document.querySelector(".display");
    calculatorState.secondNumber = Number(displayWindow.value);
    displayWindow.value = operate(calculatorState.firstNumber, calculatorState.secondNumber,calculatorState.operationToBeUsed)
}
)
body.appendChild(computeBtn)


body.appendChild(clrbtn)