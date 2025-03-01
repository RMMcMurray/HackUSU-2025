myGame.render.shaderProgram = (function(core){
    const vertexShaderSource =
        `#version 300 es
        in vec3 aCoordinates;
        in vec3 aColor;
        out vec3 vColor;

        uniform mat4 uProjectionMatrix;
        uniform mat4 uCameraPositionMatrix;

        void main() {
            gl_Position = uProjectionMatrix * uCameraPositionMatrix * vec4(aCoordinates, 1.0);
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
    that.uniformLocations = {
        projectionMatrix: core.getUniformLocation(that.program, 'uProjectionMatrix'),
        cameraPositionMatrix: core.getUniformLocation(that.program, 'uCameraPositionMatrix'),
    };

    return that;
}(myGame.render.core));