initializeEditor();

function initializeEditor() {
    const editor = document.getElementById('editor');
    const newInput = createNumberInput();
    editor.appendChild(newInput);
    newInput.focus();
}

function resizeInput(input) {
    const value = input.value;
    let width = 0;

    if (input.classList.contains('angle')) width = value.length + 0.25;
    else if (input.classList.contains('variable')) width = value.length + 0.25;
    else width = Math.max(value.length + 1, 2);

    input.style.width = width + 'ch';
}

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

function removeInput(input) {
    const previousInput = input.previousElementSibling;
    input.remove();
    previousInput.focus();
    resizeInput(previousInput);
}

function createNumberInput(value = '') {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;

    input.style.fontFamily = '"JetBrains Mono", monospace';
    input.style.fontOpticalSizing = 'auto';
    input.style.textAlign = 'center';
    input.style.color = 'inherit';
    input.style.backgroundColor = 'transparent';

    input.style.borderColor = '#555';
    input.style.borderStyle = 'dotted';
    input.style.outline = 'none';

    input.style.height = '2.5ch';
    input.style.width = '2ch';

    input.addEventListener('focus', (e) => {
        e.target.style.borderBottomWidth = '2px';
    });

    input.addEventListener('blur', (e) => {
        e.target.style.borderBottomWidth = '0px';
    });

    input.addEventListener('input', (e) => onlyAcceptNumbers(e.target));

    input.addEventListener('keydown', (e) => {
        const editor = document.getElementById('editor');
        switch (e.key) {
            case 'ArrowLeft': {
                const previousInput = input.previousElementSibling;
                if (previousInput && input.selectionStart === 0) {
                    e.preventDefault();
                    previousInput.focus();
                }
                break;
            }
            case 'ArrowRight': {
                const nextInput = input.nextElementSibling;
                if (nextInput && input.selectionStart === input.value.length) {
                    e.preventDefault();
                    nextInput.focus();
                }
                break;
            }
            case 'Backspace': {
                if (editor.children.length <= 1) break;
                if (input.value.length > 0) break;
                e.preventDefault();
                removeInput(input);
                break;
            }
            case '+': {
                e.preventDefault();
                const newOperator = createOperatorInput('+');
                const newInput = createNumberInput();

                editor.appendChild(newOperator);
                editor.appendChild(newInput);

                resizeInput(newOperator);
                resizeInput(newInput);

                newInput.focus();
                break;
            }
            case '-': {
                if (input.value.length === 0 || input.selectionStart === 0) break;

                e.preventDefault();
                const newOperator = createOperatorInput('-');
                const newInput = createNumberInput();

                editor.appendChild(newOperator);
                editor.appendChild(newInput);

                resizeInput(newOperator);
                resizeInput(newInput);

                newInput.focus();
                break;
            }
            case '*': {
                e.preventDefault();
                const newOperator = createOperatorInput('·');
                const newInput = createNumberInput();

                editor.appendChild(newOperator);
                editor.appendChild(newInput);

                resizeInput(newOperator);
                resizeInput(newInput);

                newInput.focus();
                break;
            }
            default: break;
        }
    });

    return input;
}

function createOperatorInput(value) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.value = value;

    input.style.fontFamily = '"JetBrains Mono", monospace';
    input.style.fontOpticalSizing = 'auto';
    input.style.textAlign = 'center';
    input.style.color = 'inherit';
    input.style.backgroundColor = 'transparent';

    input.style.borderColor = '#555';
    input.style.borderStyle = 'dotted';
    input.style.outline = 'none';

    input.style.height = '2.5ch';
    input.style.width = '2ch';

    input.addEventListener('focus', (e) => {
        e.target.style.borderBottomWidth = '2px';
    });

    input.addEventListener('blur', (e) => {
        e.target.style.borderBottomWidth = '0px';
    });

    input.addEventListener('keydown', (e) => {
        const editor = document.getElementById('editor');
        switch (e.key) {
            case 'ArrowLeft':
                const previousInput = input.previousElementSibling;
                if (previousInput && input.selectionStart === 0) {
                    e.preventDefault();
                    previousInput.focus();
                }
                break;
            case 'ArrowRight':
                const nextInput = input.nextElementSibling;
                if (nextInput && input.selectionStart === input.value.length) {
                    e.preventDefault();
                    nextInput.focus();
                }
                break;
            case ' ':
                e.preventDefault();
                const lastInput = editor.lastElementChild;
                if (input !== lastInput) return;

                const newInput = createNumberInput();

                editor.appendChild(newInput);
                resizeInput(newInput);

                newInput.focus();
                break;
            case 'Backspace':
                if (editor.children.length <= 1) break;
                if (input.value.length > 0) break;
                e.preventDefault();
                removeInput(input);
                break;
            default: break;
        }
    });

    return input;
}