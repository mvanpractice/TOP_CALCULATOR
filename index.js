
/**
 * Variables and DOM queries
 */

/**
 * First level query
 */
const displayPanel = document.querySelector('.display-panel');
const operationsPanel = document.querySelector('.operations-panel');
const keysPanel = document.querySelector('.keys-panel');

/**
 * Second level query
 */
const actions = operationsPanel.querySelector('.actions');
const operations = operationsPanel.querySelector('.operations');
const inputDisplay = displayPanel.querySelector('.input-display');

const operationsMap = Object.freeze({
    add: (firstNumber, SecondNumber) => firstNumber + SecondNumber,
    sub: (firstNumber, SecondNumber) => firstNumber - SecondNumber,
    mul: (firstNumber, SecondNumber) => firstNumber * SecondNumber,
    div: (firstNumber, SecondNumber) => firstNumber / SecondNumber,
});

/**
 * Functions
 */

function handleKeysPanelClick(event) {
    event.stopPropagation();

    // inputDisplay.value += event.target.id;  
}

/**
 * Event Listeners
 */

keysPanel.addEventListener('click', handleKeysPanelClick);