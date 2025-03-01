let lastTimeStamp = performance.now();

let inputBuffer = {};

// Get the coordinates of the vertex
function translateTriangle(dx, dy, dz) {

    for (let i = 0; i < (myGame.triangle.vertices.length / 3); i++) {
        myGame.triangle.vertices[(i * 3)] += dx;
        myGame.triangle.vertices[(i * 3) + 1] += dy;
        myGame.triangle.vertices[(i * 3) + 2] += dz;
    }
}

// Rotate the triangle
function rotateTriangle(angleX, angleY, angleZ) {
    // Store old locations of the vertices
    for (let i = 0; i < (myGame.triangle.vertices.length / 3); i++) {
        let x = myGame.triangle.vertices[(i * 3)];
        let myGame.triangle.vertices[(i * 3) + 1];
        myGame.triangle.vertices[(i * 3) + 2];
    }

    // Defines rotation matrices
    let xrotationMatrix = [
        1, 0, 0,
        0, Math.cos(angleX), -Math.sin(angleX),
        0, Math.sin(angleX), Math.cos(angleX)
    ];
    let yrotationMatrix = [
        Math.cos(angleY), 0, Math.sin(angleY),
        0, 1, 0,
        -Math.sin(angleY), 0, Math.cos(angleY)
    ];
    let zrotationMatrix = [
        Math.cos(angleZ), -Math.sin(angleZ), 0,
        Math.sin(angleZ), Math.cos(angleZ), 0,
        0, 0, 1
    ];
}


// Handles the inputs
function handleInputs(elapsedTime) {
    // Controls Movement Speed
    let speed = 0.01;

    // Conditional to detect key presses
    for (let input in inputBuffer) {
        if (input === 'w') {
            // Move Forward
            translateTriangle(0, 0, speed);
        }
        else if (input === 'a') {
            // Move Left
            translateTriangle(-speed, 0, 0);
        }
        else if (input === 's') {
            // Move Backward
            translateTriangle(0, 0, -speed);
        }
        else if (input === 'd') {
            // Move Right
            translateTriangle(speed, 0, 0);
        }
        else if (input === ' ') {
            // Move Up
            translateTriangle(0, speed, 0);
        }
        else if (input === 'Shift') {
            // Move Down
            translateTriangle(0, -speed, 0);
        } 
    }
}

function update(elapsedTime) {
    handleInputs(elapsedTime);
}

function render(elapsedTime) {
    myGame.render.core.clearBackground();
    myGame.render.core.drawTriangle();
}

function gameLoop(time) {
    let elapsedTime = time - lastTimeStamp;
    console.log(elapsedTime);
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