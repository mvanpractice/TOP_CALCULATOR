/**
 * Inspired by WebDev Simplified in YouTube
 * With ChatGPT's help
 * Practice OOP or Class concept
 */


const container = document.querySelector('.container');
const previousNumberDisplay = container.querySelector('#previous-number-display');
const currentNumberDisplay = container.querySelector('#current-number-display');

class Calculator {
    constructor(_previousNumberDisplay, _currentNumberDisplay) {
        this.previousNumberDisplay = _previousNumberDisplay;
        this.currentNumberDisplay = _currentNumberDisplay;

        // regEx [0-9] and dot (.)
        this.validNumbers = /^\d$|^\.$/;

        this.validActions = ['delete', 'ac'];
        this.validOperations = ['add', 'subtract', 'divide', 'multiply', '='];
        this.operationMap = {
            add: '+',
            subtract: '-',
            multiply: '*',
            divide: '÷',
        };

        // calling reset() method to initialize other properties
        this.reset();
    }

    // For reusability
    reset() {
        this.currentNumber = '';
        this.previousNumber = '';

        // setting undefined for semantics (Math)
        this.operation = undefined;
    }

    calculate() {
        let cleanedPreviousNum = this.previousNumber.replace(/(?!^)[+\-*/÷]/g, '');
        let cleanedCurrentNum = this.currentNumber.replace(/(?!^)[+\-*/÷]/g, '');
        let result = '';

        switch (this.operation) {

            case 'add':
                result = Number(cleanedPreviousNum) + Number(cleanedCurrentNum);
                break;
        
            case 'subtract':
                result = Number(cleanedPreviousNum) - Number(cleanedCurrentNum);
                break;
        
            case 'divide':
                if(Number(cleanedCurrentNum) === 0) {
                    alert('Invalid Operation!');
                    this.reset();
                    this.updateDisplayPanel();
                    return;
                }

                result = Number(cleanedPreviousNum) / Number(cleanedCurrentNum);
                
                break;
        
            case 'multiply':
                result = Number(cleanedPreviousNum) * Number(cleanedCurrentNum);
                break;
        
            default:
                return;
        }

        return result;
    }

    // For formatting
    getDisplayNumber(numberValue) {
        // ToDo - this is supposed to be the elegant way from webdev
        // but I kinda want to stick with my current solution :D
    }

    updateDisplayPanel() {
        this.previousNumberDisplay.textContent = this.previousNumber;
        this.currentNumberDisplay.textContent = this.currentNumber;
    }

    // All Clear (AC button)
    clearDisplayPanel() {
        this.reset();
    }
    // Delete button
    deleteOne() {
        let slicedNumber = '';

        if (this.previousNumber !== '' && this.currentNumber !== '') {
            // Slice the current
            slicedNumber = this.currentNumber.slice(0, -1);
            this.currentNumber = slicedNumber;
            return;
        }

        if (this.previousNumber !== '' && this.currentNumber === '') {
            // Slice the previous. Removing the operation
            slicedNumber = this.previousNumber.slice(0, -1);
            this.previousNumber = '';
            // Then assign it back to currentNumber
            this.currentNumber = slicedNumber.trim();
            return;
        }

        slicedNumber = this.currentNumber.slice(0, -1);
        this.currentNumber = slicedNumber;
    }

    insertNumber(numberValue) {
        if (numberValue === '.' && this.currentNumber.includes('.')) return;
        
        if (this.currentNumber === '' && numberValue === '.') {
            this.currentNumber = '0.';
            return;
        }

        this.currentNumber += numberValue;
    }

    insertOperation(operationKey) {
        if (this.currentNumber === '' && this.previousNumber === '') {
            // Allow entering of negative operation
            if (operationKey === 'subtract') {
                this.currentNumber = '-';

            } else {
                return;
            }
        }

        if (operationKey === '=') {
            if (this.previousNumber !== '' && this.currentNumber !== '') {
                // Call calculate method
                const resultAfterEquals = this.calculate();
                // Use toString since calculate returns number
                this.currentNumber = this.currentNumber ? resultAfterEquals.toString() : '';
                this.previousNumber = '';
                this.operation = undefined;
            }

            return;
        }

        if (this.previousNumber === '' && this.currentNumber !== '') {
            // Check if currentNumber is already just negative with no number
            if (this.currentNumber === '-') {
                return;
            }

            this.currentNumber = this.currentNumber + ` ${this.operationMap[operationKey]}`;
            this.previousNumber = this.currentNumber;
            this.currentNumber = '';
            this.operation = operationKey;
        }

        if (this.previousNumber !== '' && this.currentNumber !== '') {
            // Check if currentNumber is only an operation
            if (this.validOperations.includes(this.currentNumber)) {
                return;
            }
            // this.operation is the old operation
            // operationKey is the current operation
            const currentResultAfterOperation = this.calculate();
            
            this.previousNumber = currentResultAfterOperation + ` ${this.operationMap[operationKey]}`;
            this.currentNumber = '';
            this.operation = operationKey;
        }
    }
}

// Creating calculator instance (Object)
const calculator = new Calculator(previousNumberDisplay, currentNumberDisplay);

function handleContainerClicks(e) {
    e.stopPropagation();

    const clickedBtn = e.target;

    if (!clickedBtn.closest('button')) {
        return;
    }

    if (calculator.validNumbers.test(clickedBtn.id)) {
        // Number
        calculator.insertNumber(clickedBtn.id);
        calculator.updateDisplayPanel();

    } else if (calculator.validActions.includes(clickedBtn.id)) {
        // Action
        if (clickedBtn.id === 'ac') {
            calculator.clearDisplayPanel();
            calculator.updateDisplayPanel();

        } else if (clickedBtn.id === 'delete') {
            calculator.deleteOne();
            calculator.updateDisplayPanel();
        }

    } else if (calculator.validOperations.includes(clickedBtn.id)) {
        // Operation
        calculator.insertOperation(clickedBtn.id);
        calculator.updateDisplayPanel();
    }
}

container.addEventListener('click', handleContainerClicks);