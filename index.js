let lastTimeStamp = performance.now();

let inputBuffer = {};
let model = myGame.player1;
let model2 = myGame.player2;
// let fireSpell = myGame.fireSpell;
// let thunderSpell = myGame.thunderSpell;
let ground = myGame.ground;
let gamepadIndex = null

// Translate the model
function translateModel(dx, dy, dz, model) {
    for (let i = 0; i < (model.vertices.length / 3); i++) {
        model.vertices[(i * 3)] += dx;
        model.vertices[(i * 3) + 1] += dy;
        model.vertices[(i * 3) + 2] += dz;
    }
}

// Calculate the center of the model
function calculateCenter(vertices) {
    let centerX = 0, centerY = 0, centerZ = 0;
    let numVertices = vertices.length / 3;

    for (let i = 0; i < numVertices; i++) {
        centerX += vertices[i * 3];
        centerY += vertices[i * 3 + 1];
        centerZ += vertices[i * 3 + 2];
    }

    return {
        x: centerX / numVertices,
        y: centerY / numVertices,
        z: centerZ / numVertices
    };
}

// Rotate the model
function rotateModel(angleX, angleY, angleZ, model) {
    // Calculate the center of the object
    let center = calculateCenter(model.vertices);

    // Store old locations of the vertices
    let vertices = [];
    for (let i = 0; i < (model.vertices.length / 3); i++) {
        vertices.push([
            model.vertices[(i * 3)],
            model.vertices[(i * 3) + 1],
            model.vertices[(i * 3) + 2]
        ]);
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

    // Apply rotation matrices to the vertices
    for (let i = 0; i < vertices.length; i++) {
        let vertex = vertices[i];

        // Translate to origin
        let x = vertex[0] - center.x;
        let y = vertex[1] - center.y;
        let z = vertex[2] - center.z;

        // Apply X rotation
        let newY = y * xrotationMatrix[4] + z * xrotationMatrix[5];
        let newZ = y * xrotationMatrix[7] + z * xrotationMatrix[8];
        y = newY;
        z = newZ;

        // Apply Y rotation
        let newX = x * yrotationMatrix[0] + z * yrotationMatrix[2];
        newZ = x * yrotationMatrix[6] + z * yrotationMatrix[8];
        x = newX;
        z = newZ;

        // Apply Z rotation
        newX = x * zrotationMatrix[0] + y * zrotationMatrix[1];
        newY = x * zrotationMatrix[3] + y * zrotationMatrix[4];
        x = newX;
        y = newY;

        // Translate back to original position
        model.vertices[(i * 3)] = x + center.x;
        model.vertices[(i * 3) + 1] = y + center.y;
        model.vertices[(i * 3) + 2] = z + center.z;
    }
}


// Handles the inputs
function handleInputs(elapsedTime) {
    if (((-.95 < calculateCenter(model.vertices).x) && (calculateCenter(model.vertices).x < .95)) &&
        ((-.95 < calculateCenter(model.vertices).y) && (calculateCenter(model.vertices) < .95)) &&
        ((-.95 < calculateCenter(model.vertices).z) && (calculateCenter(model.vertices).z < .95))) {
        // Conditional to detect key presses
        for (let input in inputBuffer) {
            if (input === 'w') {
                // Move Forward
                translateModel(0, 0, model.speed, model);
            }
            else if (input === 'a') {
                // Move Left
                translateModel(-model.speed, 0, 0, model);
            }
            else if (input === 's') {
                // Move Backward
                translateModel(0, 0, -model.speed, model);
            }
            else if (input === 'd') {
                // Move Right
                translateModel(model.speed, 0, 0, model);
            }
            else if (input === ' ') {
                // Move Up
                translateModel(0, model.speed, 0, model);
            }
            else if (input === 'Shift') {
                // Move Down
                translateModel(0, -model.speed, 0, model);
            }
            else if (input === 'ArrowLeft') {
                // Rotate Left around Z-axis
                rotateModel(0, 0, model.rotationSpeed, model);
            }
            else if (input === 'ArrowRight') {
                // Rotate Right around Z-axis
                rotateModel(0, 0, -model.rotationSpeed, model);
            }
            else if (input === 'ArrowUp') {
                // Rotate Up around X-axis
                rotateModel(model.rotationSpeed, 0, 0, model);
            }
            else if (input === 'ArrowDown') {
                // Rotate Down around X-axis
                rotateModel(-model.rotationSpeed, 0, 0, model);
            }
            else if (input === 'q') {
                // Rotate Left around Y-axis
                rotateModel(0, model.rotationSpeed, 0, model);
            }
            else if (input === 'e') {
                // Rotate Right around Y-axis
                rotateModel(0, -model.rotationSpeed, 0, model);
            }


            if (input === 'i') {
                // Move Forward
                translateModel(0, 0, model2.speed, model2);
            }
            else if (input === 'j') {
                // Move Left
                translateModel(-model2.speed, 0, 0, model2);
            }
            else if (input === 'k') {
                // Move Backward
                translateModel(0, 0, -model2.speed, model2);
            }
            else if (input === 'l') {
                // Move Right
                translateModel(model2.speed, 0, 0, model2);
            }
        }
        // Handle gamepad inputs
        if (gamepadIndex !== null) {
            let gamepad = navigator.getGamepads()[gamepadIndex];
            if (gamepad) {
                // Left stick controls movement
                let leftStickX = gamepad.axes[0];
                let leftStickY = gamepad.axes[1];

                if (Math.abs(leftStickX) > 0.1) {
                    translateModel(leftStickX * model.speed, 0, 0, model);
                }
                if (Math.abs(leftStickY) > 0.1) {
                    translateModel(0, 0, leftStickY * model.speed, model);
                }

                // Right stick controls rotation
                let rightStickX = gamepad.axes[2];
                let rightStickY = gamepad.axes[3];

                if (Math.abs(rightStickX) > 0.1) {
                    rotateModel(0, -rightStickX * model.rotationSpeed, 0, model);
                }
                if (Math.abs(rightStickY) > 0.1) {
                    rotateModel(rightStickY * model.rotationSpeed, 0, 0, model);
                }

                // Jump
                if (gamepad.buttons[0].pressed) {
                    // Button A - Move Up
                    translateModel(0, model.speed, 0, model);
                    translateModel(0, -model.speed, 0, model);
                }
            }
        }
    }
    else {
        // Reset the model
        model.health += -10;
        translateModel(-calculateCenter(model.vertices), model);
    }
    
}

// Tracks hits and updates the game state
function trackHits() {
    // Check if the player1 is hit by a fireSpell
    if (myGame.collision.checkCollision(myGame.player1, myGame.fireSpell)) {
        myGame.player1.health -= myGame.fireSpell.health;
    }
    // Check if the player2 is hit by a thunderSpell
    if (myGame.collision.checkCollision(myGame.player2, myGame.thunderSpell)) {
        myGame.player2.health -= myGame.fireSpell.health;
    }     
    // Check if the fireSpell is hit by a thunderSpell
    if (myGame.collision.checkCollision(myGame.fireSpell, myGame.thunderSpell)) {
        myGame.fireSpell.health = 0;
        myGame.thunderSpell.health = 0;
    }
   
}

function update(elapsedTime) {

}

function render(elapsedTime) {
    myGame.render.core.clearBackground();
    myGame.render.core.drawModel(ground, myGame.camera);
    myGame.render.core.drawModel(model, myGame.camera);
    myGame.render.core.drawModel(model2, myGame.camera);
    // myGame.render.core.drawModel(fireSpell, myGame.camera);
    // myGame.render.core.drawModel(thunderSpell, myGame.camera);
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
    window.addEventListener("gamepadconnected", (e) => {
        console.log(
            "Gamepad connected at index %d: %s. %d buttons, %d axes.",
            e.gamepad.index,
            e.gamepad.id,
            e.gamepad.buttons.length,
            e.gamepad.axes.length,
        );
        gamepadIndex = e.gamepad.index
    });
    window.addEventListener("gamepaddisconnected", (e) => {
        console.log(
            "Gamepad disconnected from index %d: %s",
            e.gamepad.index,
            e.gamepad.id,
        );
        if (gamepadIndex === e.gamepad.index) {
            gamepadIndex = null;
        }
    });


    myGame.render.core.resizeCanvas();
    window.addEventListener('resize', myGame.render.core.resizeCanvas);

    myGame.render.core.initializeModel(ground, myGame.camera);
    myGame.render.core.initializeModel(model, myGame.camera);
    myGame.render.core.initializeModel(model2, myGame.camera);
    // myGame.render.core.initializeModel(fireSpell, myGame.camera);
    // myGame.render.core.initializeModel(thunderSpell, myGame.camera);

    requestAnimationFrame(gameLoop);
}

initialize();