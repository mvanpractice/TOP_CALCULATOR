
/**
 * Variables and DOM queries
 */

const operationsMap = Object.freeze({
    add: (firstNumber, SecondNumber) => firstNumber + SecondNumber,
    sub: (firstNumber, SecondNumber) => firstNumber - SecondNumber,
    mul: (firstNumber, SecondNumber) => firstNumber * SecondNumber,
    div: (firstNumber, SecondNumber) => firstNumber / SecondNumber,
});

const validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 0];
const validOperations = ['add', 'sub', 'mul', 'div'];
const validActions = ['erase', 'clear', 'decimal-point', '='];

const queryOne = factorySelectorMaker('querySelector');
const queryAll = factorySelectorMaker('querySelectorAll');

/**
 * First level query
 */
const container = queryOne(document, '.container');
const displayPanel = queryOne(document, '.display-panel');
const operationsPanel = queryOne(document, '.operations-panel');
const keysPanel = queryOne(document, '.keys-panel');

/**
 * Second level query
 */
const inputDisplay = queryOne(displayPanel, '.input-display');
const actionKeys = queryOne(operationsPanel, '.action-keys');
const operationKeys = queryOne(operationsPanel, '.operation-keys');

/**
 * Functions
 */

/**
 * My first factory function taught by ChatGPT
 */
function factorySelectorMaker(selectorMethod) {
    return (nodeObject, nodeSelector) => {
        return nodeObject[selectorMethod](nodeSelector);
    }
}

function handleContainerClicks(event) {
    event.stopPropagation();

    const btnclicked = event.target;

    // Only button clicks
    if (btnclicked.closest('button')) {
        
        // Only valid buttons
        if (btnclicked.id && btnclicked.id !== 'input-display') {
            
            // Check what button is clicked
            if (validNumbers.includes(parseInt(btnclicked.id))) {
                
                // Number
                handleNumberClick(btnclicked.id);
            } else if (validActions.includes(btnclicked.id)) {

                // Action
                handleActionClick(btnclicked.id);
            } else if (validOperations.includes(btnclicked.id)) {

                // Operation
                handleOperationClick(btnclicked.id);
            }
        }
    }
}

function handleNumberClick(clickId) {
    const inputValue = inputDisplay.value;

    return !inputValue ? inputDisplay.value = clickId : inputDisplay.value += clickId;
}

function handleActionClick(clickId) {
    const inputValue = inputDisplay.value;
    
    if (!inputValue) {
        console.log('empty');
    }
}

function handleOperationClick(clickId) {
    const inputValue = inputDisplay.value;

    // if input is empty, return enter number first
    // if input has value, check if all are numbers
    // I can't finish this yet, I feel so so so dumbbbb....
}

/**
 * Event Listeners
 */

container.addEventListener('click', handleContainerClicks);