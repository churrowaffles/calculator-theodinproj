let previousEntry = operator = null
let currentEntry = num1 = num2 = ''
let mainDisplay, smallDisplay

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


// Feature for "AC" button
function resetCalculator() {
    currentEntry = num1 = num2 = ''
    previousEntry = operator = null
    mainDisplay.textContent = smallDisplay.textContent = ''
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

    // Display Calculation
    mainDisplay.textContent = currentSolution;
    smallDisplay.textContent = num1 + operator + num2;

    // Set Solution as next Operand
    num1 = currentSolution;
    num2 = '';
}


document.addEventListener("DOMContentLoaded", function() {
    mainDisplay = document.querySelector('.main-display');
    smallDisplay = document.querySelector('.small-display');

    // When numbers clicked, record as current entry & display on calculator
    numbers = document.querySelectorAll('.nums input');
    numbers.forEach(e => {
        e.addEventListener('click', () => {

            // Stop user from keying more than 2 decimal places,
            // Display ongoing operation to user (e.g. 5+)
            if (e.value === '.' && currentEntry.includes('.')) {
                return;
            } else if (previousEntry in ops && num1 !== '') {
                smallDisplay.textContent = num1 + operator;
            } else if (previousEntry == '=') {
                num1 = '';
            }
            previousEntry = e.value;
            currentEntry += e.value;
            mainDisplay.textContent = currentEntry;
        })
    });

    // When operators clicked, record num1 or evaluate operation if valid
    operators = document.querySelectorAll('.ops');
    operators.forEach(e => {
        e.addEventListener('click', () => {
            if (currentEntry) {
                if (num1 === '') {
                    num1 = Number(currentEntry);
                } else {
                    evaluateAndDisplay();
                }
            }
            previousEntry = operator = e.value;
            currentEntry = '';
            operators.forEach(e => e.classList.remove('special'))
            e.classList.add('special');
        })
    })

    // When equal button clicked, evaluate operation if valid
    equalSign = document.querySelector('.eq');
    equalSign.addEventListener('click', () => {
        if (currentEntry && num1 !== '') {
            evaluateAndDisplay();
            previousEntry = equalSign.value;
            currentEntry = '';
            operators.forEach(e => e.classList.remove('special'))
        }
    })

    // When AC/C buttons are clicked
    allClear = document.querySelector('.allclear');
    allClear.addEventListener('click', resetCalculator);
    clear = document.querySelector('.clear');
    clear.addEventListener('click', clearLastEntry);

})
