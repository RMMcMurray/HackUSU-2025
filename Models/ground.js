myGame.ground = (function () {

    // Colors for the fire
    let green = [0, .6, 0];

    let that = {
        vertices: [
            // Define a simple square ground plane
            -1.0, -1.0, -1.0,  // Bottom left
            1.0, -1.0, -1.0,  // Bottom right
            1.0, -1.0, 1.0,  // Top right
            -1.0, -1.0, 1.0   // Top left
        ],
        indices: [
            0, 1, 2,  // First triangle
            0, 2, 3   // Second triangle
        ],
        vertexColors: [
            // Grassy green color for each vertex
            ...green, ...green, ...green, ...green
        ],
        hitbox: {
            minX: -1.0,
            maxX: 1.0,
            minY: 0.0,
            maxY: 0.0,
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