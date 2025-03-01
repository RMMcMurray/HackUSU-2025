myGame.ground = (function () {

    // Colors for the cube faces
    let green = [0, 0.6, 0];  // Bottom face
    let red = [1, 0, 0];      // Front face
    let blue = [0, 0, 1];     // Back face
    let yellow = [1, 1, 0];   // Left face
    let cyan = [0, 1, 1];     // Right face
    let magenta = [1, 0, 1];  // Top face

    let that = {
        vertices: [
            // Bottom face
            -1.0, -1.0, -1.0,  // 0
            1.0, -1.0, -1.0,  // 1
            1.0, -1.0, 1.0,  // 2
            -1.0, -1.0, 1.0,  // 3
            // Top face
            -1.0, 1.0, -1.0,  // 4
            1.0, 1.0, -1.0,  // 5
            1.0, 1.0, 1.0,  // 6
            -1.0, 1.0, 1.0,  // 7
            // Front face
            -1.0, -1.0, 1.0,  // 8
            1.0, -1.0, 1.0,  // 9
            1.0, 1.0, 1.0,  // 10
            -1.0, 1.0, 1.0,  // 11
            // Back face
            -1.0, -1.0, -1.0,  // 12
            1.0, -1.0, -1.0,  // 13
            1.0, 1.0, -1.0,  // 14
            -1.0, 1.0, -1.0,  // 15
            // Left face
            -1.0, -1.0, -1.0,  // 16
            -1.0, -1.0, 1.0,  // 17
            -1.0, 1.0, 1.0,  // 18
            -1.0, 1.0, -1.0,  // 19
            // Right face
            1.0, -1.0, -1.0,  // 20
            1.0, -1.0, 1.0,  // 21
            1.0, 1.0, 1.0,  // 22
            1.0, 1.0, -1.0   // 23
        ],
        indices: [
            // Bottom face
            0, 1, 2,
            0, 2, 3,
            // Top face
            4, 5, 6,
            4, 6, 7,
            // Front face
            8, 9, 10,
            8, 10, 11,
            // Back face
            12, 13, 14,
            12, 14, 15,
            // Left face
            16, 17, 18,
            16, 18, 19,
            // Right face
            20, 21, 22,
            20, 22, 23
        ],
        vertexColors: [
            // Bottom face
            ...green, ...green, ...green, ...green,
            // Top face
            ...magenta, ...magenta, ...magenta, ...magenta,
            // Front face
            ...red, ...red, ...red, ...red,
            // Back face
            ...blue, ...blue, ...blue, ...blue,
            // Left face
            ...yellow, ...yellow, ...yellow, ...yellow,
            // Right face
            ...cyan, ...cyan, ...cyan, ...cyan
        ],
        hitbox: {
            minX: -1.0,
            maxX: 1.0,
            minY: -1.0,
            maxY: 1.0,
            minZ: -1.0,
            maxZ: 1.0
        },
        // Stats for the ground
        health: 1000,
        speed: 0,
        rotationSpeed: 0
    };

    return that;
}());