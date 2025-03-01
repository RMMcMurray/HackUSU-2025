let lastTimeStamp = performance.now();

let inputBuffer = {};

// Translate the triangle
function translateTriangle(dx, dy, dz) {

    for (let i = 0; i < (myGame.triangle.vertices.length / 3); i++) {
        myGame.triangle.vertices[(i * 3)] += dx;
        myGame.triangle.vertices[(i * 3) + 1] += dy;
        myGame.triangle.vertices[(i * 3) + 2] += dz;
    }
}

// Calculate the center of the object
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

// Rotate the triangle
function rotateTriangle(angleX, angleY, angleZ) {
    // Calculate the center of the object
    let center = calculateCenter(myGame.triangle.vertices);

    // Store old locations of the vertices
    let vertices = [];
    for (let i = 0; i < (myGame.triangle.vertices.length / 3); i++) {
        vertices.push([
            myGame.triangle.vertices[(i * 3)],
            myGame.triangle.vertices[(i * 3) + 1],
            myGame.triangle.vertices[(i * 3) + 2]
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
        myGame.triangle.vertices[(i * 3)] = x + center.x;
        myGame.triangle.vertices[(i * 3) + 1] = y + center.y;
        myGame.triangle.vertices[(i * 3) + 2] = z + center.z;
    }
}


// Handles the inputs
function handleInputs(elapsedTime) {
    // Controls Movement Speed
    let speed = 0.01;
    let rotationSpeed = 0.05;

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
        else if (input === 'ArrowLeft') {
            // Rotate Left around Z-axis
            rotateTriangle(0, 0, rotationSpeed);
        }
        else if (input === 'ArrowRight') {
            // Rotate Right around Z-axis
            rotateTriangle(0, 0, -rotationSpeed);
        }
        else if (input === 'ArrowUp') {
            // Rotate Up around X-axis
            rotateTriangle(rotationSpeed, 0, 0);
        }
        else if (input === 'ArrowDown') {
            // Rotate Down around X-axis
            rotateTriangle(-rotationSpeed, 0, 0);
        }
        else if (input === 'q') {
            // Rotate Left around Y-axis
            rotateTriangle(0, rotationSpeed, 0);
        }
        else if (input === 'e') {
            // Rotate Right around Y-axis
            rotateTriangle(0, -rotationSpeed, 0);
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