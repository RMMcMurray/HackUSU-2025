let lastTimeStamp = performance.now();

function handleInputs(elapsedTime) {

}

function update(elapsedTime) {

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