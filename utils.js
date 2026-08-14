/**
 * Initialize editor by creating a number input and appending it to the editor.
 * @param {string} id 
 */
function initializeEditor(id) {
    const editor = document.getElementById(id);
    const newInput = createNumberInput();
    editor.appendChild(newInput);
    newInput.focus();
}

/**
 * Remove an input element and focus on the previous input.
 * @param {HTMLInputElement} input 
 */
function removeInput(input) {
    const previousInput = input.previousElementSibling;
    input.remove();
    previousInput.focus();
    resizeInput(previousInput);
}

/**
 * Resize input based on its value.
 * @param {HTMLInputElement} input 
 */
function resizeInput(input) {
    const value = input.value;
    let width = 0;

    if (input.classList.contains('angle')) width = value.length + 0.25;
    else if (input.classList.contains('variable')) width = value.length + 0.25;
    else width = Math.max(value.length + 1, 2);

    input.style.width = width + 'ch';
}

/**
 * Only accept numbers in the input.
 * @param {HTMLInputElement} input 
 */
function onlyAcceptNumbers(input) {
    let value = input.value;
    value = value.replace(/[^0-9.-]/g, '');

    if (value.startsWith('-')) value = '-' + value.slice(1).replace(/-/g, '');
    else value = value.replace(/-/g, '');

    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');

    input.value = value;
    resizeInput(input);
}

/**
 * Only accept operators in the input.
 * @param {HTMLInputElement} input 
 */
function onlyAcceptOperators(input) {
    let value = input.value;
    value = value.replace(/[^+\-*=]/g, '');
    value = value.replace(/\*/g, '·');

    input.value = value;
    resizeInput(input);
}