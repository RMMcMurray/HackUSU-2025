myGame.player2 = (function () {
    // Colors for the wizard model
    let hatColor = [0.5, 0, 0]; // Red
    let robeColor = [.8, .2, 0]; // Orange
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
    let hat = generateCone(0.11, 0.5, 32, hatColor, .5);
    let brim = generateCone(0.2, 0.05, 32, hatColor, .5);

    // Generate head
    let head = generateCone(0.1, -.5, 32, headColor, 0.5);

    // Generate robe (cone)
    let robe = generateCone(0.15, 1.0, 32, robeColor, -0.5);

    // Generate collar (partial cone)
    let collar = generateCone(0.15, -0.5, 32, robeColor, 0.5, 6 * Math.PI / 4);


    let that = {
        vertices: [
            ...hat.vertices,
            ...brim.vertices,
            ...head.vertices,
            ...robe.vertices,
            ...collar.vertices
        ],
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
        rotationSpeed: 0.01
    };

    return that;
}());