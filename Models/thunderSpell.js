myGame.thunderSpell = (function () {

    // Colors for the lightining
    let yellow = [1, 1, 0];
    let white = [1, 1, .8];
    let black = [.2, .2, 0];

    // Top Vertexes
    let v0 = [.05, 0.025, 0.05];
    let v1 = [.05, 0.025, -0.05];
    let v2 = [-.05, 0.025, -0.05];
    let v3 = [-.05, 0.025, 0.05];

    // Bottom Vertexes
    let v4 = [.05, -0.025, 0.05];
    let v5 = [.05, -0.025, -0.05];
    let v6 = [-.05, -0.025, -0.05];
    let v7 = [-.05, -0.025, 0.05];

    let that = {
        vertices: [
            ...v0, ...v1, ...v2, ...v3, // Top face
            ...v4, ...v5, ...v6, ...v7  // Bottom face
        ],
        indices: [
            0, 1, 2, 0, 2, 3, // Top face
            4, 5, 6, 4, 6, 7, // Bottom face
            0, 1, 5, 0, 5, 4, // Front face
            1, 2, 6, 1, 6, 5, // Right face
            2, 3, 7, 2, 7, 6, // Back face
            3, 0, 4, 3, 4, 7  // Left face
        ],
        vertexColors: [
            ...black, ...yellow, ...white, ...black, // Top face colors
            ...yellow, ...white, ...black, ...yellow // Bottom face colors
        ],
        hitbox: {
            min: [-0.05, -0.025, -0.05],
            max: [0.05, 0.025, 0.05]
        },
        // Stats for the magic spell
        health: 10,
        speed: 0.05,
        rotationSpeed: 0.01,
    };

    return that;
}());