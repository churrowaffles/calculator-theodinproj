let previousEntry = operator = null
let currentEntry = num1 = num2 = ''
let mainDisplay, smallDisplay
const maxDisplayCharacters = 17

// Mathematical Operations
const add = (a, b) => (a + b);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => {
    if (b === 0) {
        return 'ZERO/DIV';
    }
    return a / b;
}
const operate = (a, b, op) => (op(a,b));

// Dictionary to convert input to Mathematical Operations
let ops = {
    '+':add,
    '-':subtract,
    '×':multiply,
    '÷':divide
}


// Feature to toggle off all operator buttons
function toggleOffOperators() {
    operators.forEach(e => e.classList.remove('special'))
}


// Feature for "AC" button
function resetCalculator() {
    currentEntry = num1 = num2 = ''
    previousEntry = operator = null
    mainDisplay.textContent = smallDisplay.textContent = ''
    toggleOffOperators()
}


// Feature for "C" button
function clearLastEntry() {
    if (currentEntry) {
        currentEntry = currentEntry.slice(0,-1);
        mainDisplay.textContent = currentEntry;
    }
}


// Feature for calculations when operator/'=' clicked
function evaluateAndDisplay() {
    // Evaluate the Calculation
    num2 = Number(currentEntry);
    let currentSolution = operate(num1, num2, ops[operator]);
    
    // Handle overflow of results when there is a floating point
    if (currentSolution.toString().length > maxDisplayCharacters) {
        currentSolution = currentSolution.toString();
        let beforeDecimalCount = currentSolution.split('.')[0].length;
        if (currentSolution.includes('.') && beforeDecimalCount < maxDisplayCharacters) {
            let decimalLength = maxDisplayCharacters - 1 - beforeDecimalCount;
            currentSolution = +Number(currentSolution).toFixed(decimalLength);
        }
    }

    // Display Calculation
    mainDisplay.textContent = currentSolution;
    smallDisplay.textContent = num1 + operator + num2;

    // Set Solution as next Operand
    num1 = currentSolution;
    num2 = '';
}

function keyboardTrigger(e) {
    // Prevent "/" sign default action of opening search box
    if (e.key === '/') e.preventDefault();

    // If key exists, click it and add CSS animation
    key = keyExists(e.key)
    if (key !== false) {
        key.click()
        key.classList.add('active');
    }
}


function keyboardRelease(e) {
    key = keyExists(e.key)
    if (key !== false) {
        key.classList.remove('active');
    }
}


function keyExists(keyValue) {
    // Allow Enter to act as equal sign
    if (keyValue === 'Enter') keyValue = '=';
    let key = document.querySelector(`.calc input[data-key='${keyValue}']`);
    return (key ? key : false);
}



document.addEventListener("DOMContentLoaded", function() {
    mainDisplay = document.querySelector('.main-display');
    smallDisplay = document.querySelector('.small-display');

    // When numbers clicked, record as current entry & display on calculator
    numbers = document.querySelectorAll('.nums input');
    numbers.forEach(e => {
        e.addEventListener('click', () => {

            // Stop user from keying more than 2 decimal places,
            if (e.value === '.' && currentEntry.includes('.')) return;

            if (previousEntry in ops && num1 !== '') {
            // Display ongoing operation to user (e.g. 5+)
                smallDisplay.textContent = num1 + operator;
                
            } else if (previousEntry == '=') {
            // Start a new operation
                num1 = '';
                smallDisplay.textContent = '';
            }

            previousEntry = e.value;
            currentEntry += e.value;
            mainDisplay.textContent = currentEntry;
        })
    });

    operators = document.querySelectorAll('.ops');
    operators.forEach(e => {
        e.addEventListener('click', () => {
            // Record first operand or evaluate operation if valid
            if (currentEntry) {
                if (num1 === '') {
                    num1 = Number(currentEntry);
                } else {
                    evaluateAndDisplay();
                }
            }

            previousEntry = operator = e.value;
            currentEntry = '';
            toggleOffOperators();
            e.classList.add('special');
        })
    })

    equalSign = document.querySelector('.eq');
    equalSign.addEventListener('click', () => {
        // Evaluate operation if valid
        if (currentEntry && num1 !== '') {
            evaluateAndDisplay();
            previousEntry = equalSign.value;
            currentEntry = '';
            toggleOffOperators();
        }
    })

    // When AC/C buttons are clicked
    allClear = document.querySelector('.allclear');
    allClear.addEventListener('click', resetCalculator);
    clear = document.querySelector('.clear');
    clear.addEventListener('click', clearLastEntry);

    // Keyboard trigger and release event
    window.addEventListener('keydown', keyboardTrigger);
    window.addEventListener('keyup', keyboardRelease);
})
