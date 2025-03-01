

function handleInputs(elapsedTime) {

}

function update(elapsedTime) {

}

function render(elapsedTime) {
    render.core.clearBackground();
}

function gameLoop(time) {
    let elapsedTime = time - lastTimeStamp;
    lastTimeStamp = time;

    handleInputs(elapsedTime);
    update(elapsedTime);
    render(elapsedTime);
    requestAnimationFrame(gameLoop);
}