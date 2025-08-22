
const container = document.querySelector('.container');
const firstNumberDisplay = container.querySelector('#first-number-display');
const secondNumberDisplay = container.querySelector('#second-number-display');

class Calculator {
    constructor(firstNumberDisplay, secondNumberDisplay) {
        this.firstNumberDisplay = firstNumberDisplay;
        this.secondNumberDisplay = secondNumberDisplay;
        this.validNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.validOperators = ['add', 'subtract', 'divide', 'multiply'];
        this.reset();
    }

    reset() {
        this.firstNumber = '';
        this.secondNumber = '';
        this.operator = undefined;
    }

    updateDisplayPanel() {
        // To do, not fully flexible or separated concern
        this.firstNumberDisplay.textContent = this.firstNumber + (this.operator ?? '');
        this.secondNumberDisplay.textContent = this.secondNumber;
    }

    clearDisplayPanel() {
        this.reset();
    }

    deleteANumber() {
        if (this.secondNumber !== '') {
            const splitSecondNumber = this.secondNumber.split('');
            splitSecondNumber.splice(splitSecondNumber.length - 1, 1);

            const joinedSecondNumber = splitSecondNumber.join('');
            this.secondNumber = joinedSecondNumber;

        } else if (this.secondNumber === '' && this.firstNumber !== '') {
            const splitFirstNumber = this.firstNumber.split('');
            splitFirstNumber.splice(splitFirstNumber.length - 1, 1);

            const joinedFirstNumber = splitFirstNumber.join('');
            this.firstNumber = joinedFirstNumber;
        }
    }

    insertNumber(_number) {
        this.secondNumber += _number;
    }

    insertOperator(_operator) {
        if (this.firstNumber === '' && this.secondNumber !== '') {
            // Set this.operator value from undefined to current _operator
            this.operator = _operator;
            this.firstNumber = this.secondNumber;
            this.secondNumber = '';
        }

        if (this.firstNumber !== '' && this.secondNumber !== '') {
            this.firstNumber = this.operate();
            this.secondNumber = '';
            this.operator = _operator;
        }

    }

    operate() {
        let result = '';
        const firstNum = parseFloat(this.firstNumber);
        const secondNum = parseFloat(this.secondNumber);

        switch (this.operator) {
            case '÷':
                result = firstNum / secondNum;
                break;
                
            case '*':
                result = firstNum * secondNum;
                break;

            case '+':
                result = firstNum + secondNum;
                break;

            case '-':
                result = firstNum - secondNum;
                break;
        }
        
        return result;
    }
}

const calculator = new Calculator(firstNumberDisplay, secondNumberDisplay);

function handleNumberClick(event) {
    event.stopPropagation();

    const clickedBtn = event.target;
    const clickedNumber = Number(clickedBtn.id);

    if (clickedBtn.closest('button')
        && !isNaN(clickedNumber)
        && calculator.validNumbers.includes(clickedNumber)) {
            // Number is clicked
            calculator.insertNumber(clickedNumber);
            calculator.updateDisplayPanel();

    } else if (clickedBtn.closest('button')
        && calculator.validOperators.includes(clickedBtn.id)) {
            // Operator is clicked
            calculator.insertOperator(clickedBtn.textContent);
            calculator.updateDisplayPanel();

    } else if (clickedBtn.closest('button')
        && clickedBtn.id === 'ac') {
            // All Clear is clicked
            calculator.clearDisplayPanel();
            calculator.updateDisplayPanel();

    } else if (clickedBtn.closest('button') && clickedBtn.id === 'delete') {
        // Delete is clicked
        calculator.deleteANumber();
        calculator.updateDisplayPanel();
    }
}

container.addEventListener('click', handleNumberClick);