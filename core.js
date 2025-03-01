myGame.render.core = (function () {
    let canvas = document.getElementById('canvas');
    let gl = canvas.getContext('webgl2');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        clearBackground();
    }

    function clearBackground() {
        gl.clearColor(.82, .70, .55, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    // Initializes the buffers for the triangle
    function initializeBuffersTriangle() {
        // Triangle Vertex Buffer
        let vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myGame.triangle.vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        // Triangle Index Buffer
        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(myGame.triangle.indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        // Triangle Color Buffer
        let colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myGame.triangle.vertexColors), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        return {
            vertexBuffer: vertexBuffer,
            indexBuffer: indexBuffer,
            colorBuffer: colorBuffer
        };
    };

    // Initializes the shaders for the triangle
    function initializeShadersTriangle() {
        // Vertex Shader
        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, myGame.triangle.vertexShaderSource);
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error('Vertex shader compilation error:', gl.getShaderInfoLog(vertexShader));
            return null;
        }

        // Fragment Shader
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, myGame.triangle.fragmentShaderSource);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fragmentShader));
            return null;
        }

        // Shader Program
        let shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error('Shader program linking error:', gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        gl.useProgram(shaderProgram);

        return {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            shaderProgram: shaderProgram
        };
    };

    // Associates the buffers with the shaders
    let associateBuffersWithShadersTriangle = function (vertexBuffer, indexBuffer, colorBuffer, shaderProgram) {
        // Creates buffer the coordinates attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        let coordinates = gl.getAttribLocation(shaderProgram, 'aCoordinates');
        gl.vertexAttribPointer(coordinates, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coordinates);

        // Creates buffer the color attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        let color = gl.getAttribLocation(shaderProgram, 'aColor');
        gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(color);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    };

    // Draws the triangle
    function drawTriangle() {
        let buffers = initializeBuffersTriangle();
        let shaders = initializeShadersTriangle();
        if (!shaders) return; // Exit if shader initialization failed
        associateBuffersWithShadersTriangle(buffers.vertexBuffer, buffers.indexBuffer, buffers.colorBuffer, shaders.shaderProgram);
        clearBackground();
        gl.drawElements(gl.TRIANGLES, myGame.triangle.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    return {
        clearBackground: clearBackground,
        resizeCanvas: resizeCanvas,
        drawTriangle: drawTriangle,
    };
}());