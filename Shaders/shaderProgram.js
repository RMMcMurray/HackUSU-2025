myGame.render.shaderProgram = (function(core){
    const vertexShaderSource =
        `#version 300 es
        in vec3 aCoordinates;
        in vec3 aColor;
        out vec3 vColor;

        void main() {
            gl_Position = vec4(aCoordinates, 1.0);
            vColor = aColor;
        }
        `;
    const fragmentShaderSource =
        `#version 300 es
        precision mediump float;
        in vec3 vColor;
        out vec4 outColor;

        void main() {
            outColor = vec4(vColor, 1.0);
        }
        `;
    
    let that = {
        program: null,
        attributeLocations: {},
        uniformLocations: {},
    };

    that.program = core.initializeShaderProgram(vertexShaderSource, fragmentShaderSource);
    that.attributeLocations = {
        position: core.getAttributeLocation(that.program, 'aCoordinates'),
        color: core.getAttributeLocation(that.program, 'aColor'),
    };
    that.uniformLocations = {};

    return that;
}(myGame.render.core));