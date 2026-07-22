(function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const fontSize = 15;
    const fontFamily = '"Roboto Mono", "Courier New", monospace';
    const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops = [];

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        columns = Math.floor(width / fontSize);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.textBaseline = 'top';

        drops = [];
        for (let x = 0; x < columns; x++) drops[x] = Math.random() * -100;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < drops.length; i++) {
            const y = drops[i] * fontSize;
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

            if (Math.random() > 0.985) {
                ctx.fillStyle = '#2e2e2e';
            } else {
                ctx.fillStyle = '#1c1c1c';
            }

            ctx.fillText(text, i * fontSize, y);

            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    resize();
    setInterval(drawMatrix, 50);
    window.addEventListener('resize', resize);
})();
