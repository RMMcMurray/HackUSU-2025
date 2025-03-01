myGame.player1 = (function () {
    // Colors for the wizard model
    let hat = [0.5, 0, 0.5]; // Purple
    let body = [0, 0, 1]; // Blue
    let base = [0.5, 0.25, 0]; // Brown

    // Number of segments for the rounder hat and brim
    let hatSegments = 16;
    let hatVertices = [];
    let hatIndices = [];
    let hatColors = [];

    // Top point of the hat
    hatVertices.push(0, 1, 0);
    hatColors.push(...hat);

    // Generate vertices around the base of the hat
    for (let i = 0; i < hatSegments; i++) {
        let angle = (i / hatSegments) * 2 * Math.PI;
        let x = 0.5 * Math.cos(angle);
        let z = 0.5 * Math.sin(angle);
        hatVertices.push(x, 0.5, z);
        hatColors.push(...hat);
    }

    // Generate vertices for the brim of the hat
    for (let i = 0; i < hatSegments; i++) {
        let angle = (i / hatSegments) * 2 * Math.PI;
        let x = 0.7 * Math.cos(angle);
        let z = 0.7 * Math.sin(angle);
        hatVertices.push(x, 0.5, z);
        hatColors.push(...hat);
    }

    // Generate indices for the hat
    for (let i = 1; i <= hatSegments; i++) {
        let nextIndex = (i % hatSegments) + 1;
        hatIndices.push(0, i, nextIndex);
    }

    // Generate indices for the brim of the hat
    for (let i = 1; i <= hatSegments; i++) {
        let nextIndex = (i % hatSegments) + 1;
        let brimIndex = i + hatSegments;
        let nextBrimIndex = nextIndex + hatSegments;
        hatIndices.push(i, brimIndex, nextIndex);
        hatIndices.push(nextIndex, brimIndex, nextBrimIndex);
    }

    let that = {
        vertices: [
            ...hatVertices,

            // Body (wizard robe)
            -0.3, 0.5, -0.3, // Top base of the body
            0.3, 0.5, -0.3,
            0.3, 0.5, 0.3,
            -0.3, 0.5, 0.3,
            -0.5, -0.5, -0.5, // Bottom base of the body (wider for robe effect)
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5,

            // Base (rectangle)
            -0.5, -0.5, -0.5, // Bottom base of the model
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5
        ],

        // Indices for the wizard model
        indices: [
            ...hatIndices,

            // Body (wizard robe)
            1 + hatSegments * 2, 2 + hatSegments * 2, 6 + hatSegments * 2,
            1 + hatSegments * 2, 6 + hatSegments * 2, 5 + hatSegments * 2,
            2 + hatSegments * 2, 3 + hatSegments * 2, 7 + hatSegments * 2,
            2 + hatSegments * 2, 7 + hatSegments * 2, 6 + hatSegments * 2,
            3 + hatSegments * 2, 4 + hatSegments * 2, 8 + hatSegments * 2,
            3 + hatSegments * 2, 8 + hatSegments * 2, 7 + hatSegments * 2,
            4 + hatSegments * 2, 1 + hatSegments * 2, 5 + hatSegments * 2,
            4 + hatSegments * 2, 5 + hatSegments * 2, 8 + hatSegments * 2,

            // Base (rectangle)
            9 + hatSegments * 2, 10 + hatSegments * 2, 11 + hatSegments * 2,
            9 + hatSegments * 2, 11 + hatSegments * 2, 12 + hatSegments * 2
        ],

        // Colors for the wizard model
        vertexColors: [
            ...hatColors,

            // Body (wizard robe)
            ...body,
            ...body,
            ...body,
            ...body,
            ...body,
            ...body,
            ...body,
            ...body,

            // Base (rectangle)
            ...base,
            ...base,
            ...base,
            ...base
        ],
    };
    
    return that;
}());