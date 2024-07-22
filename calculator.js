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

// Doing a calculation itself function: based on the state of the calculator: 
// Result = function(first number , second number, operator)
const operate = function (calculatorState) {
    calculatorState.calculationResult = calculatorState.operatorToBeUsed.function(calculatorState.firstNumber, calculatorState.secondNumber);
    return calculatorState.calculationResult;
};



// An enumeration object containing the operators and their function callbacks, string name, and symbols
const operators = {
    add: {
        function: add,
        name: 'add',
        symbol: '+'
    },
    subtract: {
        function: subtract,
        name: 'subtract',
        symbol: '—'
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

// An enumeration of which button was last pressed, to keep track of in the calculator state object
const lastButtonPressedEnum = {
    clear: 'clear',
    number: 'number',
    calculate: 'calculate',
    operator: 'operator',
    decimalPoint: 'decimalPoint',
    negativeSign: 'negativeSign',
    test: 'test'
}

// Global Object Holding Important State Variables::
const calculatorState = {
    operatorToBeUsed: null, // operator object, i.e. 'add', 'subtract','multiply','divide'
    firstNumber: null,
    secondNumber: null,
    calculationResult: null,
    displayWindowString: null,
    lastButtonPressed: lastButtonPressedEnum.clear,// Default is 'clear', can be: 'number' 'calculate' 'clear' 'operator'
    thereIsANegativeSign: false

}


// Put something in the upper display window
const putInDisplayWindow = function (char) {
    // Input should be a string, typically a single character
    let displayWindow = document.querySelector(".display");


    if (calculatorState.lastButtonPressed === lastButtonPressedEnum.operator ||
        calculatorState.lastButtonPressed === lastButtonPressedEnum.calculate ||
        calculatorState.lastButtonPressed === lastButtonPressedEnum.test) {
        displayWindow.value = char; // Clear the display value with new data 
    } else if (char === "-") { // if a negative sign and didn't just press the above buttons
        displayWindow.value = char + displayWindow.value;
    } else {
        displayWindow.value += char;
    }

}

const removeNegativeSign = function () {
    let displayWindow = document.querySelector(".display");
    displayWindow.value = displayWindow.value.slice(1);
}


// Create The Calculator Main Container: 
const body = document.querySelector('body');
const calculatorContainer = document.createElement("div");
calculatorContainer.className = "calculatorContainer";
body.appendChild(calculatorContainer)

// First define functions that create various buttons. Then later I'll call those functions
// In a precise order.



function createDisplay() {
    const divDisplayContainer = document.createElement('input');
    divDisplayContainer.className = "display";
    calculatorContainer.appendChild(divDisplayContainer);
}


function createClearButton() {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button");
    btn.classList.add("clearButton")
    btn.textContent = "Clear";
    btn.addEventListener("click", () => {
        let displayWindow = document.querySelector(".display");
        displayWindow.value = '';
        calculatorState.secondNumber = null;
        calculatorState.firstNumber = null;
        calculatorState.lastButtonPressed = lastButtonPressedEnum.clear;
    }
    )
    calculatorContainer.appendChild(btn)

    btn.addEventListener('mousedown', () => {
        btn.classList.add('highlighted');
    }
    )

    btn.addEventListener('mouseup', () => {
        btn.classList.remove('highlighted');
    }
    )
}

function createNumberButton(i) {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button");
    btn.setAttribute("id", i);
    btn.classList.add('numberButton');
    btn.textContent = i;

    // Event listeners

    btn.addEventListener("click", () => {
        putInDisplayWindow(btn.textContent)
        calculatorState.lastButtonPressed = lastButtonPressedEnum.number;
    });
    calculatorContainer.appendChild(btn);

    btn.addEventListener('mousedown', () => {
        btn.classList.add('highlighted');
    }
    )

    btn.addEventListener('mouseup', () => {
        btn.classList.remove('highlighted');
    }
    )
}

function createDecimalPointButton() {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button")
    btn.textContent = '.';
    btn.classList.add('numberButton');
    btn.addEventListener("click", () => {
        let displayWindow = document.querySelector(".display");
        if (!displayWindow.value.includes('.') ||
            calculatorState.lastButtonPressed === lastButtonPressedEnum.calculate ||
            calculatorState.lastButtonPressed === lastButtonPressedEnum.operator) {
            putInDisplayWindow(btn.textContent)
            calculatorState.lastButtonPressed = lastButtonPressedEnum.decimalPoint;
        }
    });
    calculatorContainer.appendChild(btn);

    btn.addEventListener('mousedown', () => {
        btn.classList.add('highlighted');
    }
    )

    btn.addEventListener('mouseup', () => {
        btn.classList.remove('highlighted');
    }
    )
}

function createOperatorButton(op) {

    const btn = document.createElement("button");
    btn.setAttribute("class", "button")
    btn.textContent = op.symbol;
    btn.value = op.name;
    btn.setAttribute("id", op.name)

    btn.classList.add("operatorStyle");

    btn.addEventListener("click", () => {

        let displayWindow = document.querySelector(".display");
        calculatorState.firstNumber = Number(displayWindow.value);
        calculatorState.operatorToBeUsed = op;
        console.log(`operation to be used is set: ${calculatorState.operatorToBeUsed.name}`)
        calculatorState.lastButtonPressed = lastButtonPressedEnum.operator;
    })

    btn.addEventListener('mousedown', () => {
        btn.classList.add('highlighted');
    }
    )

    btn.addEventListener('mouseup', () => {
        btn.classList.remove('highlighted');
    }
    )

    calculatorContainer.appendChild(btn);
}


function createEqualsButton() {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button");
    btn.setAttribute("id", lastButtonPressedEnum.calculate)
    btn.textContent = "=";
    btn.classList.add("equalsStyle");
    btn.addEventListener("click", () => {
        // Only do the calculation if the last thing you did was click a number. 
        // And if there is a "first number" that was previously calculated during an "operator" click

        if ((calculatorState.lastButtonPressed === lastButtonPressedEnum.number ||
            calculatorState.lastButtonPressed === lastButtonPressedEnum.negativeSign ||
            calculatorState.lastButtonPressed === lastButtonPressedEnum.decimalPoint
        ) &&
            calculatorState.firstNumber !== null
        ) {
            let displayWindow = document.querySelector(".display");
            calculatorState.secondNumber = Number(displayWindow.value);
            calculatorState.calculationResult = operate(calculatorState);
            calculatorState.lastButtonPressed = lastButtonPressedEnum.calculate;

            putInDisplayWindow(calculatorState.calculationResult);

            // Reset the "first" and "second" number so that the calculator thinks it still needs 
            // to click an operator before a new calculation can be performed
            calculatorState.firstNumber = null;
            calculatorState.secondNumber = null;

        }

    }
    )

    btn.addEventListener('mousedown', () => {
        btn.classList.add('highlighted');
    }
    )

    btn.addEventListener('mouseup', () => {
        btn.classList.remove('highlighted');
    }
    )

    calculatorContainer.appendChild(btn)

}


function createNegativeSignButton() {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button");
    btn.classList.add('numberButton');
    btn.textContent = "+/-";
    btn.addEventListener("click", () => {
        let displayWindow = document.querySelector(".display");
        if (!displayWindow.value.includes('-') ||
            calculatorState.lastButtonPressed == lastButtonPressedEnum.operator) {
            putInDisplayWindow('-');

        } else {
            removeNegativeSign();
        }
        calculatorState.lastButtonPressed = lastButtonPressedEnum.negativeSign;
    })

    btn.addEventListener('mousedown', () => {
        btn.classList.toggle('highlighted');
    }
    )

    btn.addEventListener('mouseup', () => {
        btn.classList.toggle('highlighted');
    }
    )

    calculatorContainer.appendChild(btn)
}



// I actually put the calculator into the DOM here:

// Top Row
createDisplay()
// Second Row
createNumberButton(7);
createNumberButton(8);
createNumberButton(9);
createOperatorButton(operators.add);
// Third Row
createNumberButton(4);
createNumberButton(5);
createNumberButton(6);
createOperatorButton(operators.subtract);
// Fourth Row
createNumberButton(1);
createNumberButton(2);
createNumberButton(3);
createOperatorButton(operators.multiply);
// Fifth Row
createDecimalPointButton();
createNumberButton(0);
createNegativeSignButton();
createOperatorButton(operators.divide);
// Sixth Row 
createClearButton();
createEqualsButton();