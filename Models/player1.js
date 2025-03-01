myGame.player1 = (function () {
    // Colors for the wizard model
    let collarColor = [0.4, 0, .6]; // Dark Purple
	let robeColor = [0.6, 0.1, 8]; // Purple
	let brimColor = [.05, .2, .8]; // Blue
    let hatColor = [.02, .2, .6]; // Darker Blue
    let headColor = [0, 0, 0]; // Black

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

    // Generate hat (cone with brim)
    let hat = generateCone(0.11, 0.5, 32, hatColor, .525);
    let brim = generateCone(0.2, 0.05, 32, brimColor, .5);

    // Generate head
    let head = generateCone(0.1, -.5, 32, headColor, 0.5);

    // Generate robe (cone)
    let robe = generateCone(0.15, 1.0, 32, robeColor, -0.5);

    // Generate collar (partial cone)
    let collar = generateCone(0.15, -0.5, 32, collarColor, 0.5, 6 * Math.PI / 4);

    // Combine all vertices
    let allVertices = [
        ...hat.vertices,
        ...brim.vertices,
        ...head.vertices,
        ...robe.vertices,
        ...collar.vertices
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
        vertices: allVertices,
        indices: [
            ...hat.indices,
            ...brim.indices.map(index => index + hat.vertices.length / 3),
            ...head.indices.map(index => index + (hat.vertices.length + brim.vertices.length) / 3),
            ...robe.indices.map(index => index + (hat.vertices.length + brim.vertices.length + head.vertices.length) / 3),
            ...collar.indices.map(index => index + (hat.vertices.length + brim.vertices.length + head.vertices.length + robe.vertices.length) / 3)
        ],
        vertexColors: [
            ...hat.vertexColors,
            ...brim.vertexColors,
            ...head.vertexColors,
            ...robe.vertexColors,
            ...collar.vertexColors
        ],

        // Stats for the player
        health: 100,
        speed: 0.01,
        rotationSpeed: 0.01,

        // Hitbox for the player
        hitbox
    };

    return that;
}());