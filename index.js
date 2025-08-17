
/**
 * Variables and DOM queries
 */

const displayPanel = document.querySelector('.display-panel');
const operationsPanel = document.querySelector('.operations-panel');
const keysPanel = document.querySelector('.keys-panel');

const inputEntry = [];

/**
 * I only want operate method to only process internal value
 */
const calculator = {
    operation: {
        add: '+',
        sub: '-',
        div: '/',
        mul: '*',
        erase: 'erase',
        clear: 'clear',
        equals: '=',
        point: '.'
    },

    numberKey: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],

    operationMap: {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    },

    operate: function (firstNum, secondNum, operator) {
        const operate = this.operationMap[operator];
        return operate ? operate(firstNum, secondNum) : `{${operator}} - is an invalid Math Operator`;
    }
};

function validateInputData(inputKey, inputId) {
    let validInputKey;

    switch (inputId) {
        case 'number':
            validInputKey = calculator.numberKey.find(number => number === inputKey);
            break;
    
        case 'point':
            validInputKey = inputKey in calculator.operation ? inputKey : 'Invalid input';
            break;

        case 'equals':
            validInputKey = inputKey in calculator.operation ? inputKey : 'Invalid input';
            break;
        case 'add': 
            validInputKey = inputKey in calculator.operation ? inputKey : 'Invalid input';
            break;
        case 'sub': 
            validInputKey = inputKey in calculator.operation ? inputKey : 'Invalid input';
            break;
        case 'div': 
            validInputKey = inputKey in calculator.operation ? inputKey : 'Invalid input';
            break;
        case 'mul': 
            validInputKey = inputKey in calculator.operation ? inputKey : 'Invalid input';
            break;
    }

    return validInputKey;
}

function handlekeysPanelClick(event) {
    event.stopPropagation();

    const keyPressed = event.target;

    if (keyPressed.closest('button') && keyPressed?.id === 'point') {
        const validInput = validateInputData(keyPressed.id, 'point');

        if (validInput) {
             if (inputEntry.find(input => input === validInput)) {
                alert('You cannot add  more than one decimal point!');
                return;
             }

             inputEntry.push(validInput);
        }

    } else if (keyPressed.closest('button') && keyPressed?.id === 'equals') {
        const validInput = validateInputData(keyPressed.id, 'equals');
        console.log(validInput);

    } else {
        const validInput = validateInputData(parseInt(keyPressed.id), 'number');
        
        if (validInput) {
            inputEntry.push(validInput);
        }
    }

    console.log(inputEntry);
}

function handleOperationsPanelClick(event) {
    event.stopPropagation();

    const keyPressed = event.target;

    if (keyPressed.closest('button') && keyPressed?.id === 'add') {
        const validInput = validateInputData(keyPressed.id, 'add');

        if (validInput) {
            if (inputEntry.find(input => input === validInput)) {
                
            }
        }

    } else if (keyPressed.closest('button') && keyPressed?.id === 'sub') {
        const validInput = validateInputData(keyPressed.id, 'sub');

        if (validInput) {
            
        }

    } else if (keyPressed.closest('button') && keyPressed?.id === 'mul') {
        const validInput = validateInputData(keyPressed.id, 'mul');

        if (validInput) {
            
        }
        
    } else if (keyPressed.closest('button') && keyPressed?.id === 'div') {
        const validInput = validateInputData(keyPressed.id, 'div');

        if (validInput) {
            
        }

    }
}

keysPanel.addEventListener('click', handlekeysPanelClick);

operationsPanel.addEventListener('click', handleOperationsPanelClick);
