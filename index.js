let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('webgl');

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

}

function gameLoop() {
    handleInputs();
    update();
    render();
    requestAnimationFrame(gameLoop);
}