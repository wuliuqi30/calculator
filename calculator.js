// Calculator operators:
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


const operate = function (calculatorState) {
    calculatorState.calculationResult = calculatorState.operatorToBeUsed.function(calculatorState.firstNumber, calculatorState.secondNumber);

    return calculatorState.calculationResult;
};

const operators = {
    add: {
        function: add,
        name: 'add',
        symbol: '+'
    },
    subtract: {
        function: subtract,
        name: 'subtract',
        symbol: '-'
    },
    multiply: {
        function: multiply,
        name: 'multiply',
        symbol: 'x'
    },
    divide: {
        function: divide,
        name: 'divide',
        symbol: '÷'
    }
}

const lastButtonPressedEnum = {
    clear: 'clear',
    number: 'number',
    calculate: 'calculate',
    operator: 'operator',
    decimalPoint: 'decimalPoint'
}



// Monkey around with some things:

let a = 3;
let b = 5;
// let c = operate(a, b, operators.subtract);
// console.log(` operate(a,b,add) gives ${c}`);

// Do not edit below this line
// module.exports = {
//     add,
//     subtract,
//     multiply,
//     divide,
//     operate
//   };

const putInDisplayWindow = function (char) {
    // Input should be a string, typically a single character
    let displayWindow = document.querySelector(".display");

    if (calculatorState.lastButtonPressed === lastButtonPressedEnum.operator ||
        calculatorState.lastButtonPressed === lastButtonPressedEnum.calculate) {
        displayWindow.value = char; // Clear the display value with new data
    } else {
        displayWindow.value += char;
    }
}

// Create Calculator In Javascript: 


// Global Object Holding Important State Variables::
const calculatorState = {
    operatorToBeUsed: null, // operator object, i.e. 'add', 'subtract','multiply','divide'
    firstNumber: null,
    secondNumber: null,
    calculationResult: null,
    displayWindowString: null,
    lastButtonPressed: lastButtonPressedEnum.clear// Default is 'clear', can be: 'number' 'calculate' 'clear' 'operator'

}

// lastButtonPressed can be: 


// Create The Calculator: 
const body = document.querySelector('body');


const calculatorContainer = document.createElement("div");
calculatorContainer.className = "calculatorContainer";
body.appendChild(calculatorContainer)

// Create the display:
const divDisplayContainer = document.createElement('input');
divDisplayContainer.className = "display";
calculatorContainer.appendChild(divDisplayContainer);

// Create Clear Button

// const clrbtn = document.createElement("button");
// clrbtn.setAttribute("class", "button");
// clrbtn.setAttribute("id", "clearButton")
// clrbtn.textContent = "Clear";
// clrbtn.addEventListener("click", () => {
//     let displayWindow = document.querySelector(".display");
//     displayWindow.value = '';
//     calculatorState.secondNumber = null;
//     calculatorState.firstNumber = null;
//     calculatorState.lastButtonPressed = lastButtonPressedEnum.clear;
// }
// )
// calculatorContainer.appendChild(clrbtn)

function createClearButton() {
    const clrbtn = document.createElement("button");
    clrbtn.setAttribute("class", "button");
    clrbtn.setAttribute("id", "clearButton")
    clrbtn.textContent = "Clear";
    clrbtn.addEventListener("click", () => {
        let displayWindow = document.querySelector(".display");
        displayWindow.value = '';
        calculatorState.secondNumber = null;
        calculatorState.firstNumber = null;
        calculatorState.lastButtonPressed = lastButtonPressedEnum.clear;
    }
    )
    calculatorContainer.appendChild(clrbtn)
}
createClearButton();
// Create the Divide Button

// Create 10 buttons

for (i = 0; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button");
    btn.setAttribute("id", i);
    btn.textContent = i;

    // Event listeners

    btn.addEventListener("click", () => {
        putInDisplayWindow(btn.textContent)
        calculatorState.lastButtonPressed = lastButtonPressedEnum.number;
    });
    calculatorContainer.appendChild(btn);
}

// Create a button for the . (decimal point)

const btnDot = document.createElement("button");
btnDot.setAttribute("class", "button")
btnDot.textContent = '.';
btnDot.addEventListener("click", () => {
    let displayWindow = document.querySelector(".display");
    if (!displayWindow.value.includes('.') ||
        calculatorState.lastButtonPressed === lastButtonPressedEnum.calculate) {
        putInDisplayWindow(btnDot.textContent)
        calculatorState.lastButtonPressed = lastButtonPressedEnum.decimalPoint;
    }
});
calculatorContainer.appendChild(btnDot);

// Create Buttons for the operators

for (const op in operators) {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button")
    let subObj = operators[op];
    btn.textContent = subObj.symbol;
    btn.value = subObj.name;
    btn.setAttribute("id", subObj.name)
    calculatorContainer.appendChild(btn);

    btn.addEventListener("click", () => {

        let displayWindow = document.querySelector(".display");
        calculatorState.firstNumber = Number(displayWindow.value);
        calculatorState.operatorToBeUsed = subObj;
        console.log(`operation to be used is set: ${calculatorState.operatorToBeUsed.name}`)
        calculatorState.lastButtonPressed = lastButtonPressedEnum.operator;
    })
}



// Create Compute Button (=)
const computeBtn = document.createElement("button");
computeBtn.setAttribute("class", "button");
computeBtn.setAttribute("id", lastButtonPressedEnum.calculate)
computeBtn.textContent = "=";
computeBtn.addEventListener("click", () => {
    // Only do the calculation if the last thing you did was click a number. 
    // And if there is a "first number" that was previously calculated during an "operator" click

    if (calculatorState.lastButtonPressed === lastButtonPressedEnum.number &&
        calculatorState.firstNumber
    ) {
        let displayWindow = document.querySelector(".display");
        calculatorState.secondNumber = Number(displayWindow.value);
        calculatorState.calculationResult = operate(calculatorState);
        calculatorState.lastButtonPressed = lastButtonPressedEnum.calculate;
        // Put the full calculation in the box to the left of the result

        putInDisplayWindow(calculatorState.calculationResult);

        // Reset the "first" and "second" number so that the calculator thinks it still needs 
        // to click an operator before a new calculation can be performed
        calculatorState.firstNumber = null;
        calculatorState.secondNumber = null;

    }

}
)
calculatorContainer.appendChild(computeBtn)


// Create a "test" button which will run through a bunch of system checks to make sure
// that nothing is broken


const testButton = document.createElement("button");
testButton.setAttribute("class", "button");
testButton.setAttribute("id", "test")
testButton.textContent = "Test";
testButton.addEventListener("click", () => {
    runSystemTest();
})
calculatorContainer.appendChild(testButton)



// Things to Add: 

// 2) Orient everything nicely together 

// 3) Get nice colors



// Tests

// Automatically run a 1 + 2 = event.

const runTest = true;
function runSystemTest() {

    // Specify the tests to be run:
    let allButtons = document.querySelectorAll("button");
    let testButton1 = document.getElementById("1");
    let addButton = document.getElementById(operators.add.name);
    let testButton2 = document.getElementById("2");
    let computeBtn = document.getElementById(lastButtonPressedEnum.calculate);

    let displayVal = document.querySelector(".display");

    let clickEvent = new Event('click');
    // Press 1
    testButton1.dispatchEvent(clickEvent);
    //console.log(`pressed 1 and display holds ${displayVal.value}`)
    // Press Add
    addButton.dispatchEvent(clickEvent);
    // Press 2
    testButton2.dispatchEvent(clickEvent);
    //console.log(`pressed 2 and display holds ${displayVal.value}`)
    // Press Calculate
    computeBtn.dispatchEvent(clickEvent);
    displayVal.value == 3 ? displayVal.value = "SUCCESS" : displayVal.value = "FAILED";


}