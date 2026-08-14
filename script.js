const inputs = document.querySelectorAll('.auto-resize')

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        const width = Math.max(value.length + 1, 2.5);
        input.style.width = width + 'ch';
    });

    input.addEventListener('keydown', (e) => {
        console.log(e.key)
    });
});