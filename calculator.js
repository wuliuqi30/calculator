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

const lastButtonPressedEnum = {
    clear: 'clear',
    number: 'number',
    calculate: 'calculate',
    operator: 'operator',
    decimalPoint: 'decimalPoint',
    negativeSign: 'negativeSign',
    test: 'test'
}




const putInDisplayWindow = function (char) {
    // Input should be a string, typically a single character
    let displayWindow = document.querySelector(".display");

    
    if (calculatorState.lastButtonPressed === lastButtonPressedEnum.operator ||
        calculatorState.lastButtonPressed === lastButtonPressedEnum.calculate ||
        calculatorState.lastButtonPressed === lastButtonPressedEnum.test) {
        displayWindow.value = char; // Clear the display value with new data 
    } else if (char === "-"){ // if a negative sign and didn't just press the above buttons
        displayWindow.value = char + displayWindow.value; 
    } else {
        displayWindow.value += char;
    }

}

const removeNegativeSign = function(){
    let displayWindow = document.querySelector(".display");
    displayWindow.value = displayWindow.value.slice(1);
}

// Create Calculator In Javascript: 


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

// lastButtonPressed can be: 


// Create The Calculator: 
const body = document.querySelector('body');

const calculatorContainer = document.createElement("div");
calculatorContainer.className = "calculatorContainer";
body.appendChild(calculatorContainer)

// First define functions that create various buttons. Then later I'll call those functions
// In a precise order.


// Create the display:
function createDisplay() {
    const divDisplayContainer = document.createElement('input');
    divDisplayContainer.className = "display";
    calculatorContainer.appendChild(divDisplayContainer);
}
// Create Clear Button

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

    btn.addEventListener('mousedown',()=>{
        btn.classList.add('highlighted');
    }
    )

    btn.addEventListener('mouseup',()=>{
        btn.classList.remove('highlighted');
    }
    )
}


// Create a number button
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

    btn.addEventListener('mousedown',()=>{
        btn.classList.add('highlighted');
    }
    )

    btn.addEventListener('mouseup',()=>{
        btn.classList.remove('highlighted');
    }
    )
}

// Create a button for the . (decimal point)
function createDecimalPointButton() {
    const btn = document.createElement("button");
    btn.setAttribute("class", "button")
    btn.textContent = '.';
    btn.classList.add('numberButton');
    btn.addEventListener("click", () => {
        let displayWindow = document.querySelector(".display");
        if (!displayWindow.value.includes('.') ||
            calculatorState.lastButtonPressed === lastButtonPressedEnum.calculate) {
            putInDisplayWindow(btn.textContent)
            calculatorState.lastButtonPressed = lastButtonPressedEnum.decimalPoint;
        }
    });
    calculatorContainer.appendChild(btn);

    btn.addEventListener('mousedown',()=>{
        btn.classList.add('highlighted');
    }
    )

    btn.addEventListener('mouseup',()=>{
        btn.classList.remove('highlighted');
    }
    )
}

// Create a button for an operator
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

    btn.addEventListener('mousedown',()=>{
        btn.classList.add('highlighted');
    }
    )

    btn.addEventListener('mouseup',()=>{
        btn.classList.remove('highlighted');
    }
    )

    calculatorContainer.appendChild(btn);
}



// Create Compute Button (=)
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

            // putInDisplayWindow(calculatorState.firstNumber + ' ' + 
            //     calculatorState.operatorToBeUsed.symbol + ' ' + 
            //     calculatorState.secondNumber + ' = ' +  
            //     calculatorState.calculationResult);

            // Reset the "first" and "second" number so that the calculator thinks it still needs 
            // to click an operator before a new calculation can be performed
            calculatorState.firstNumber = null;
            calculatorState.secondNumber = null;

        }

    }
    )

    btn.addEventListener('mousedown',()=>{
        btn.classList.add('highlighted');
    }
    )

    btn.addEventListener('mouseup',()=>{
        btn.classList.remove('highlighted');
    }
    )

    calculatorContainer.appendChild(btn)
   
}

//
function createNegativeSignButton(){
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

    btn.addEventListener('mousedown',()=>{
        btn.classList.toggle('highlighted');
    }
    )

    btn.addEventListener('mouseup',()=>{
        btn.classList.toggle('highlighted');
    }
    )

    calculatorContainer.appendChild(btn)
}

// Create a "test" button which will run through a bunch of system checks to make sure
// that nothing is broken

function createTestButton() {
    const testButton = document.createElement("button");
    testButton.setAttribute("class", "button");
    testButton.setAttribute("id", "test")
    testButton.textContent = "Test";
    testButton.addEventListener("click", () => {
        calculatorState.lastButtonPressed = lastButtonPressedEnum.test;
        runSystemTest();
    })
    calculatorContainer.appendChild(testButton)
}
// I actually create the buttons here:
createDisplay()

createNumberButton(7);
createNumberButton(8);
createNumberButton(9);
createOperatorButton(operators.add);

createNumberButton(4);
createNumberButton(5);
createNumberButton(6);
createOperatorButton(operators.subtract);

createNumberButton(1);
createNumberButton(2);
createNumberButton(3);
createOperatorButton(operators.multiply);

createDecimalPointButton();
createNumberButton(0);
createNegativeSignButton();
createOperatorButton(operators.divide);

createClearButton();
createEqualsButton() 





// Things to Add: 

// 2) Orient everything nicely together 

// 3) Get nice colors



// Tests

// Automatically run a 1 + 2 = event.

const runTest = true;
function runSystemTest() {

    // Specify the tests to be run
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