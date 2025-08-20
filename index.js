

const firstNumber = 0;
const secondNumber = 0;
const operator = '';

const validNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const validOperations = ['add', 'sub', 'mul', 'div'];
const validActions = ['.', '=', 'erase', 'clear'];

const operationMapper = Object.freeze({
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b,
});

const inputDisplay = document.querySelector('.input-display');
const container = document.querySelector('.container');

function handleContainerClicks(event) {
    event.stopPropagation();

    const keyPressed = event.target;

    if (keyPressed.id && keyPressed.closest('button')) {

        if (validNumbers.includes(parseInt(keyPressed.id))) {
            // Number
            handleNumberKey(keyPressed.id);

        } else if (validActions.includes(keyPressed.id)) {
            // Action
            handleActionKey(keyPressed.id);

        } else if (validOperations.includes(keyPressed.id)) {
            // Operation
            handleOperationKey(keyPressed.id);
        }
    }
}

function handleNumberKey(keyId) {
    return !inputDisplay.value ? inputDisplay.value = keyId : inputDisplay.value += keyId;
}

function handleActionKey(keyId) {
    const splitInput = inputDisplay.value.split('');

    switch (keyId) {
        case 'erase':
            splitInput.pop();
            const joinInput = splitInput.join('');
            inputDisplay.value = joinInput;
            break;
    
        case 'clear':
            inputDisplay.value = '';
            break;

        case '.':
            const hasDecimal = splitInput.includes(keyId);
            
            if (!hasDecimal) {
                splitInput.push(keyId);
                const joinInput = splitInput.join('');
                inputDisplay.value = joinInput;

            }
            break;

        case '=':
            if (inputDisplay.value) {
                const validOperator = /[\+\-\*\/]/;
                const operatorIndex = inputDisplay.value.search(validOperator);

                if (operatorIndex !== -1) {
                    const splitInput = inputDisplay.value.split(inputDisplay.value.charAt(operatorIndex));
                    
                    if (splitInput[0] && splitInput[1]) {
                        // 
                        getValidOperation(splitInput[0], splitInput[1], inputDisplay.value.charAt(operatorIndex));
                    }
                }
            }
            break;
    }
}

function handleOperationKey(keyId) {
    if (inputDisplay.value) {
        const validOperator = /[\+\-\*\/]/;
        const operatorIndex = inputDisplay.value.search(validOperator);

        if (operatorIndex !== -1) {
            const splitInput = inputDisplay.value.split(inputDisplay.value.charAt(operatorIndex));
            
            if (splitInput[0] && splitInput[1]) {
                // 
                getValidOperation(splitInput[0], splitInput[1], inputDisplay.value.charAt(operatorIndex));
            }
            
        } else {
            switch (keyId) {
                case 'add':
                    inputDisplay.value += '+';
                    break;

                case 'sub':
                    inputDisplay.value += '-';
                    break;

                case 'mul':
                    inputDisplay.value += '*';
                    break;

                case 'div':
                    inputDisplay.value += '/';
                    break;
            }
        }
    }
}

function getValidOperation(num1, num2, oper, trueOper) {
    switch (oper) {
        case '*':
            const prod = operationMapper.mul(num1, num2);
            inputDisplay.value = prod;
            break;
        case '/':
            const qout = operationMapper.div(num1, num2);
            inputDisplay.value = qout;
            break;
        case '+':
            const sum = operationMapper.add(num1, num2);
            inputDisplay.value = sum;
            break;
        case '-':
            const diff = operationMapper.sub(num1, num2);
            inputDisplay.value = diff;
            break;
    }
}

container.addEventListener('click', handleContainerClicks);