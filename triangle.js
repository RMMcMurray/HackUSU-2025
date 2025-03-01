myGame.triangle = (function (input) {
    let that = {
        // Defines the vertices of the triangle
        vertices: [
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.0, 0.5, 0.0
        ],
        indices: [
            0, 1, 2
        ],
        vertexColors: [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ],
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
}(myGame.triangle.input));