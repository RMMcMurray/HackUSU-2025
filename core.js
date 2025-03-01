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
    return {
        clearBackground: clearBackground,
        resizeCanvas: resizeCanvas,
    };
}());

window.addEventListener('resize', myGame.render.core.resizeCanvas);

myGame.render.core.resizeCanvas();