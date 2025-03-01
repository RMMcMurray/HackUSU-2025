let lastTimeStamp = performance.now();

let inputBuffer = {};

function handleInputs(elapsedTime) {
    for (let input in inputBuffer) {
        if (input === 'w') {
            // Move Left
        }
    }
}

// Translate the triangle
function translateTriangle() {
    for (let i = 0; i < (myGame.triangle.vertices.length / 3); i++) {
        let x = myGame.triangle.vertices[(i * 3)];
        let y = myGame.triangle.vertices[(i * 3) + 1];
        let z = myGame.triangle.vertices[(i * 3) + 2];
    }
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

function initialize() {
    window.addEventListener('keydown', function(event) {
        inputBuffer[event.key] = event.timeStamp;
    });
    window.addEventListener('keyup', function(event) {
        delete inputBuffer[event.key];
    });

    myGame.render.core.resizeCanvas();
    window.addEventListener('resize', myGame.render.core.resizeCanvas);

    requestAnimationFrame(gameLoop);
}

initialize();