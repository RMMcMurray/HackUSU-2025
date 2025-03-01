let lastTimeStamp = performance.now();

function handleInputs(elapsedTime) {

}

// Translate the triangle
function translateTriangle() {
    
}
function update(elapsedTime) {
    // Rotate the triangle
    myGame.triangle.rotation[1] += 0.001;

    // Translate the triangle
    translateTriangle();
    
}

function render(elapsedTime) {
    myGame.render.core.clearBackground();
    myGame.render.core.drawTriangle();
}

function gameLoop(time) {
    let elapsedTime = time - lastTimeStamp;
    lastTimeStamp = time;

    handleInputs(elapsedTime);
    update(elapsedTime);
    render(elapsedTime);
    requestAnimationFrame(gameLoop);
}

myGame.render.core.resizeCanvas();
window.addEventListener('resize', myGame.render.core.resizeCanvas);

requestAnimationFrame(gameLoop);