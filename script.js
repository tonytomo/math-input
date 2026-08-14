const inputs = document.querySelectorAll('.auto-resize')

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        let width = 0;

        if (input.classList.contains('angle')) width = value.length + 0.25;
        else if (input.classList.contains('variable')) width = value.length + 0.25;
        else width = Math.max(value.length + 1, 2);

        input.style.width = width + 'ch';
    });

    input.addEventListener('keydown', (e) => {
        console.log(e.key)
    });
});

function initialResize() {
    inputs.forEach(input => {
        const value = input.value;
        let width = 0;

        if (input.classList.contains('angle')) width = value.length + 0.25;
        else if (input.classList.contains('variable')) width = value.length + 0.25;
        else width = Math.max(value.length + 1, 2);

        input.style.width = width + 'ch';
    });
}

initialResize();