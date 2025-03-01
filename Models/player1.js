myGame.player1 = (function () {
    // Colors for the wizard model
    let hat = [0.5, 0, 0.5]; // Purple
    let body = [0, 0, 1]; // Blue
	let base = [0.5, 0.25, 0]; // Brown

	let that = {
        vertices: [
            // Hat (cone)
            0, 1, 0, // Top point of the hat
            -0.5, 0.5, -0.5, // Base of the hat
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,

            // Body (cylinder)
            -0.3, 0.5, -0.3, // Top base of the body
            0.3, 0.5, -0.3,
            0.3, 0.5, 0.3,
            -0.3, 0.5, 0.3,
            -0.3, -0.5, -0.3, // Bottom base of the body
            0.3, -0.5, -0.3,
            0.3, -0.5, 0.3,
            -0.3, -0.5, 0.3,

            // Base (rectangle)
            -0.5, -0.5, -0.5, // Bottom base of the model
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5,

            // Additional vertices for more detail
            0, 0.75, 0, // Mid point of the hat
            -0.25, 0.5, -0.25, // Mid base of the hat
            0.25, 0.5, -0.25,
            0.25, 0.5, 0.25,
            -0.25, 0.5, 0.25,

            -0.15, 0.5, -0.15, // Mid top base of the body
            0.15, 0.5, -0.15,
            0.15, 0.5, 0.15,
            -0.15, 0.5, 0.15,
            -0.15, -0.5, -0.15, // Mid bottom base of the body
            0.15, -0.5, -0.15,
            0.15, -0.5, 0.15,
            -0.15, -0.5, 0.15
        ],

    // Indices for the wizard model
        indices: [
            // Hat (cone)
            0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 1,

            // Additional detail for the hat
            17, 18, 19,
            17, 19, 20,
            17, 20, 21,
            17, 21, 18,

            // Body (cylinder)
            5, 6, 10,
            5, 10, 9,
            6, 7, 11,
            6, 11, 10,
            7, 8, 12,
            7, 12, 11,
            8, 5, 9,
            8, 9, 12,

            // Additional detail for the body
            22, 23, 27,
            22, 27, 26,
            23, 24, 28,
            23, 28, 27,
            24, 25, 29,
            24, 29, 28,
            25, 22, 26,
            25, 26, 29,

            // Base (rectangle)
            13, 14, 15,
            13, 15, 16
        ],

        // Colors for the wizard model
        colors: [
            // Hat (cone)
            ...hat, 
            ...hat,
            ...hat,
            ...hat,
            ...hat,

            // Body (cylinder)
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
            ...base,

            // Additional colors for more detail
            ...hat,
            ...hat,
            ...hat,
            ...hat,

            ...body,
            ...body,
            ...body,
            ...body,
            ...body,
            ...body,
            ...body,
            ...body
        ],
    };
    
    return that;
}());