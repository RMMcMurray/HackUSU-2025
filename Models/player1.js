myGame.player1 = (function (input) {
    // Colors for the wizard model
    purple = [0.5, 0, 0.5];
let vertices = [
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
        -0.5, -0.5, 0.5
    ];

    // Indices for the wizard model
    let indices = [
        // Hat (cone)
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 1,

        // Body (cylinder)
        5, 6, 10,
        5, 10, 9,
        6, 7, 11,
        6, 11, 10,
        7, 8, 12,
        7, 12, 11,
        8, 5, 9,
        8, 9, 12,

        // Base (rectangle)
        13, 14, 15,
        13, 15, 16
    ];

    // Colors for the wizard model
    let colors = [
        // Hat (cone)
        ...purple, // Purple
        ...purple,
        ...purple,
        ...purple,
        ...purple,

        // Body (cylinder)
        0, 0, 1, // Blue
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        // Base (rectangle)
        0.5, 0.25, 0, // Brown
        0.5, 0.25, 0,
        0.5, 0.25, 0,
        0.5, 0.25, 0
    ];
        vertexShaderSource:
        `#version 300 es
        in vec3 aCoordinates;
        in vec3 aColor;
        out vec3 vColor;

        void main() {
            gl_Position = vec4(aCoordinates, 1.0);
            vColor = aColor;
        }
        `,
        fragmentShaderSource:
        `#version 300 es
        precision mediump float;
        in vec3 vColor;
        out vec4 outColor;

        void main() {
            outColor = vec4(vColor, 1.0);
        }
        `
    };
    
    return that;
}(myGame.player1.input));