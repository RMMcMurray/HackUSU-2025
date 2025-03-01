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
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    // Initializes the buffers for the triangle
    function initilizeBuffersTriangle() {
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
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myGame.triangle.vetexColors), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };

    // Initializes the shaders for the triangle
    function initilizeShadersTriangle() {
        // Vertex Shader
        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, myGame.triangle.vertexShaderSource);
        gl.compileShader(vertexShader);

        // Fragment Shader
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, myGame.triangle.fragmentShaderSource);
        gl.compileShader(fragmentShader);

        // Shader Program
        let shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);
    };





    return {
        clearBackground: clearBackground,
        resizeCanvas: resizeCanvas,
    };
}());

window.addEventListener('resize', myGame.render.core.resizeCanvas);

myGame.render.core.resizeCanvas();