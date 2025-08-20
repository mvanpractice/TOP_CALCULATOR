
const validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const validOperations = ['+', '*', '-', '/'];
const validActions = ['=', '.', 'erase', 'clear'];
const regexMatch = /[.*\/+\-]/;

const operation = Object.freeze({
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) => num1 / num2
});

const container = document.querySelector('.container');
const displayPanel = document.querySelector('.display-panel');
const inputDisplay = displayPanel.querySelector('.input-display');

function insertNumber(num) {
    if (inputDisplay.value === '') {
        inputDisplay.value += num;
        return;
    }

    // Check if the values are all numbers - No symbol
    const hasSymbol = inputDisplay.value.search(regexMatch); // -1 if false
    // If all numbers, append new number
    if (hasSymbol === -1) {
        inputDisplay.value += num;

    } else {
        const symbolBeforeMatch = inputDisplay.value.charAt(hasSymbol - 1);

        if (!validOperations.includes(symbolBeforeMatch)) {
            inputDisplay.value += num;
        }
    }
}

function insertOperation(operator) {

    if (inputDisplay.value) {
        // Check for symbols
        const hasSymbol = inputDisplay.value.search(regexMatch);
        // If all numbers
        if (hasSymbol === -1) {
            inputDisplay.value += operator;
            return;

        } else {
            // Check left and right value
            const matchedSymbol = inputDisplay.value.charAt(hasSymbol);
            const splitInputValue = inputDisplay.value.split(matchedSymbol);

            const valueBefore = splitInputValue[0];
            const valueAfter = splitInputValue[1];

            if (valueBefore.length !== 0 && valueAfter.length !== 0) {
                displayResult(parseInt(valueBefore), parseInt(valueAfter), matchedSymbol, operator);
            }
        }
    }
}

function displayResult(firstNumber, secondNumber, previousOperator, currentOperator) {
    let res = '';
    switch (previousOperator) {
        case '+':
            res = operation.add(firstNumber, secondNumber);
            break;

        case '-':
            res = operation.subtract(firstNumber, secondNumber);
            break;

        case '*':
            res = operation.multiply(firstNumber, secondNumber);
            break;

        case '/':
            res = operation.divide(firstNumber, secondNumber);
            break;
    }

    inputDisplay.value = res + currentOperator;
}

function insertAction(action) {
    switch (action) {
        case 'erase':
            const splitInputValue = inputDisplay.value.split('');
            splitInputValue.pop();
            const joinInputValue = splitInputValue.join('');

            inputDisplay.value = joinInputValue;
            break;
    
        case 'clear':
            inputDisplay.value = '';
            break;
    
        case '.':
            const hasSymbol = inputDisplay.value.search(regexMatch);

            if (hasSymbol === -1) {
                inputDisplay.value += action;
            }
            break;
    
        case '=':
            
            break;
    
    }
}

function handleContainerClicks(event) {
    event.stopPropagation();

    const clickedBtn = event.target;

    if (validNumbers.includes(parseInt(clickedBtn.id))) {
        // Number Button
        insertNumber(clickedBtn.id);

    } else if (validOperations.includes(clickedBtn.id)) {
        // Operation
        insertOperation(clickedBtn.id);

    } else if (validActions.includes(clickedBtn.id)) {
        // Action
        insertAction(clickedBtn.id);
    }
}

container.addEventListener('click', handleContainerClicks);