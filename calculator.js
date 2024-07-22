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

// Mini Tests
console.log(add(1, 1));
console.log(subtract(-3, 1));
console.log(multiply(0, 0));
console.log(multiply(0, 1));
console.log(multiply(90, 2));
console.log(divide(1, 0));
console.log(divide(0, 1));
console.log(divide(2, 9));


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

const clrbtn = document.createElement("button");
clrbtn.setAttribute("class", "button");
clrbtn.setAttribute("id","clearButton")
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
// Create the Divide Button

// Create 10 buttons

for (i = 0; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button")
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





// Things to Add: 

// 1)
// After a successful calculation,
// show the full calculation typed out in the display window 
// in lighter font

// 2) Orient everything nicely together 

// 3) Get nice colors

