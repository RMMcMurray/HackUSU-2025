let lastTimeStamp = performance.now();

let inputBuffer = {};

// Get the coordinates of the vertex
function translateTriangle(dx, dy, dz) {
    let cost = Math.cos(angle);
    let sint = Math.sin(angle);

    for (let i = 0; i < (myGame.triangle.vertices.length / 3); i++) {
        x = myGame.triangle.vertices[(i * 3)]
        y = myGame.triangle.vertices[(i * 3) + 1]
        z = myGame.triangle.vertices[(i * 3) + 2]

        x += dx;
        y += dy;
        z += dz;

        myGame.triangle.vertices[(i * 3)] = x * cost - y * sint;
        myGame.triangle.vertices[(i * 3) + 1] = x * sint + y * cost;
    }
}


// Translate the triangle
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