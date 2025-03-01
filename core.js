myGame.render.core = (function () {
    let canvas = document.getElementById('canvas');
    let gl = canvas.getContext('webgl2');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        clearBackground();
    }

    function clearBackground() {
        gl.clearColor(0, 0, 0, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function initializeBuffer(bufferType, data) {
        let buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, data, gl.STATIC_DRAW);
        gl.bindBuffer(bufferType, null);
        return buffer;
    }

    function initializeBuffers(model) {
        let vertexBuffer = initializeBuffer(gl.ARRAY_BUFFER, new Float32Array(model.vertices));
        let indexBuffer = initializeBuffer(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices));
        let colorBuffer = initializeBuffer(gl.ARRAY_BUFFER, new Float32Array(model.vertexColors));

        return {
            vertexBuffer: vertexBuffer,
            indexBuffer: indexBuffer,
            colorBuffer: colorBuffer
        };
    }

    function initializeShader(type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    function initializeShaderProgram(vertexShaderSource, fragmentShaderSource) {
        let vertexShader = initializeShader(gl.VERTEX_SHADER, vertexShaderSource);
        let fragmentShader = initializeShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        let shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error('Shader program linking error:', gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        gl.useProgram(shaderProgram);

        return shaderProgram;
    }

    function getAttributeLocation(shaderProgram, attributeName) {
        return gl.getAttribLocation(shaderProgram, attributeName);
    }

    function getUniformLocation(shaderProgram, uniformName) {
        return gl.getUniformLocation(shaderProgram, uniformName);
    }

    // Associates the buffers with the shaders
    let associateBufferWithAttribute = function (buffer, attribute) {
        // Creates buffer the coordinates attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(attribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };

    function initializeModel(model) {
        model.buffers = initializeBuffers(model);
        associateBufferWithAttribute(model.buffers.vertexBuffer, myGame.render.shaderProgram.attributeLocations.position);
        associateBufferWithAttribute(model.buffers.colorBuffer, myGame.render.shaderProgram.attributeLocations.color);
    }

    // Draws the triangle
    function drawModel(model) {
        initializeModel(model);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.buffers.indexBuffer);
        gl.drawElements(gl.TRIANGLES, model.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    return {
        initializeShaderProgram: initializeShaderProgram,
        getAttributeLocation: getAttributeLocation,
        getUniformLocation: getUniformLocation,
        clearBackground: clearBackground,
        resizeCanvas: resizeCanvas,
        initializeModel: initializeModel,
        drawModel: drawModel,
    };
}());