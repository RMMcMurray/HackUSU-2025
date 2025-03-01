let canvas = document.getElementById('canvas');
let gl = canvas.getContext('webgl2');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

//ctx.fillStyle = 'red';
//ctx.fillRect(0, 0, canvas.width, canvas.height);

function handleInputs() {

}

function update() {

}

function render() {
    triangle = {
        vertices: [
            -0.5, -0.5,
            0.5, -0.5,
            0.0, 0.5
        ],
        color: [
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
        ]
    }
}

function gameLoop() {
    handleInputs();
    update();
    render();
    requestAnimationFrame(gameLoop);
}