myGame.player1 = (function () {

    // Colors for the wizard model
    let hatColor = [0.5, 0, 0.5]; // Purple
    let robeColor = [0, 0, 1]; // Blue
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

    // Generate arms (two small cones)
    let leftArm = generateCone(0.05, 0.3, 32, robeColor, 0);
    let rightArm = generateCone(0.05, 0.3, 32, robeColor, 0);

    // Offset the arms to the sides
    leftArm.vertices = leftArm.vertices.map((v, i) => i % 3 === 0 ? v - 0.2 : v); // Move left arm to the left
    rightArm.vertices = rightArm.vertices.map((v, i) => i % 3 === 0 ? v + 0.2 : v); // Move right arm to the right

    let that = {
        vertices: [
            ...hat.vertices,
            ...brim.vertices,
            ...head.vertices,
            ...robe.vertices,
            ...collar.vertices,
            ...leftArm.vertices,
            ...rightArm.vertices
        ],
        indices: [
            ...hat.indices,
            ...brim.indices.map(index => index + hat.vertices.length / 3),
            ...head.indices.map(index => index + (hat.vertices.length + brim.vertices.length) / 3),
            ...robe.indices.map(index => index + (hat.vertices.length + brim.vertices.length + head.vertices.length) / 3),
            ...collar.indices.map(index => index + (hat.vertices.length + brim.vertices.length + head.vertices.length + robe.vertices.length) / 3),
            ...leftArm.indices.map(index => index + (hat.vertices.length + brim.vertices.length + head.vertices.length + robe.vertices.length + collar.vertices.length) / 3),
            ...rightArm.indices.map(index => index + (hat.vertices.length + brim.vertices.length + head.vertices.length + robe.vertices.length + collar.vertices.length + leftArm.vertices.length) / 3)
        ],
        vertexColors: [
            ...hat.vertexColors,
            ...brim.vertexColors,
            ...head.vertexColors,
            ...robe.vertexColors,
            ...collar.vertexColors,
            ...leftArm.vertexColors,
            ...rightArm.vertexColors
        ],

        // Stats for the player
        health: 100,
        speed: 0.01,
        rotationSpeed: 0.01
    };

    return that;
}());