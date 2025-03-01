myGame.player2 = (function () {
    // Colors for the wizard model
    let hatColor = [0.3, 0, 0]; // Red
    let brimColor = [0.5, 0, 0]; // Darker Red
    let robeColor = [.8, .2, 0]; // Orange
    let collarColor = [.7, .1, 0]; // Darker Yellow
    let headColor = [0, 0, 0]; // Black
    let shotgunColor = [0.2, 0.2, 0.2]; // Gray

    // Function to generate vertices and indices for a cone
    function generateCone(radius, height, segments, color, yOffset, angleSpan = 2 * Math.PI) {
        let vertices = [];
        let indices = [];
        let vertexColors = [];

        // Tip of the cone
        vertices.push(0, height + yOffset, 0);
        vertexColors.push(...color);

        // Base of the cone
        for (let i = 0; i <= segments; i++) {
            let angle = (i / segments) * angleSpan;
            let x = radius * Math.cos(angle);
            let z = radius * Math.sin(angle);
            vertices.push(x, yOffset, z);
            vertexColors.push(...color);
        }

        // Indices for the cone
        for (let i = 1; i <= segments; i++) {
            indices.push(0, i, i + 1);
        }

        return { vertices, indices, vertexColors };
    }

    // Function to generate vertices and indices for a shotgun
    function generateShotgun(length, width, height, color, xOffset, yOffset, zOffset) {
        let vertices = [
            // Front face
            xOffset, yOffset, zOffset,
            xOffset + width, yOffset, zOffset,
            xOffset + width, yOffset + height, zOffset,
            xOffset, yOffset + height, zOffset,
            // Back face
            xOffset, yOffset, zOffset + length,
            xOffset + width, yOffset, zOffset + length,
            xOffset + width, yOffset + height, zOffset + length,
            xOffset, yOffset + height, zOffset + length
        ];

        let indices = [
            // Front face
            0, 1, 2, 0, 2, 3,
            // Back face
            4, 5, 6, 4, 6, 7,
            // Top face
            3, 2, 6, 3, 6, 7,
            // Bottom face
            0, 1, 5, 0, 5, 4,
            // Right face
            1, 2, 6, 1, 6, 5,
            // Left face
            0, 3, 7, 0, 7, 4
        ];

        let vertexColors = [];
        for (let i = 0; i < vertices.length / 3; i++) {
            vertexColors.push(...color);
        }

        return { vertices, indices, vertexColors };
    }

    // Generate hat (cone with brim)
    let hat = generateCone(0.11, 0.5, 32, hatColor, .525);
    let brim = generateCone(0.2, 0.05, 32, brimColor, .5);

    // Generate head
    let head = generateCone(0.1, -.5, 32, headColor, 0.5);

    // Generate robe (cone)
    let robe = generateCone(0.15, 1.0, 32, robeColor, -0.5);

    // Generate collar (partial cone)
    let collar = generateCone(0.15, -0.5, 32, collarColor, 0.5, 6 * Math.PI / 4);

    // Generate shotgun
    let shotgun = generateShotgun(.01, 0.01, 1, shotgunColor, 0.2, -.5, -0.15);

    // Combine all vertices
    let allVertices = [
        ...hat.vertices,
        ...brim.vertices,
        ...head.vertices,
        ...robe.vertices,
        ...collar.vertices,
        ...shotgun.vertices
    ];

    // Calculate hitbox (bounding box)
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (let i = 0; i < allVertices.length; i += 3) {
        let x = allVertices[i];
        let y = allVertices[i + 1];
        let z = allVertices[i + 2];

        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (z < minZ) minZ = z;

        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        if (z > maxZ) maxZ = z;
    }

    let hitbox = {
        minX, minY, minZ,
        maxX, maxY, maxZ
    };

    let that = {
        vertices: allVertices.map(element => element * .05),
        indices: [
            ...hat.indices,
            ...brim.indices.map(index => index + hat.vertices.length / 3),
            ...head.indices.map(index => index + (hat.vertices.length + brim.vertices.length) / 3),
            ...robe.indices.map(index => index + (hat.vertices.length + brim.vertices.length + head.vertices.length) / 3),
            ...collar.indices.map(index => index + (hat.vertices.length + brim.vertices.length + head.vertices.length + robe.vertices.length) / 3),
            ...shotgun.indices.map(index => index + (hat.vertices.length + brim.vertices.length + head.vertices.length + robe.vertices.length + collar.vertices.length) / 3)
        ],
        vertexColors: [
            ...hat.vertexColors,
            ...brim.vertexColors,
            ...head.vertexColors,
            ...robe.vertexColors,
            ...collar.vertexColors,
            ...shotgun.vertexColors
        ],

        // Stats for the player
        health: 100,
        speed: 0.0075,
        rotationSpeed: 0.05,
        velocity: 0,

        // Hitbox for the player
        hitbox
    };

    return that;
}());