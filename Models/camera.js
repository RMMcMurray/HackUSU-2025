myGame.camera = (function(){
    function perspective(fovy, aspect, near, far) {
        const f = 1/Math.tan(fovy / 2);
        const range = near - far;
        const matrix = [
            f/aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) / range, -1,
            0, 0, (2 * far * near) / range, 0
        ]
        return matrix;
    }

    // Normalize a vector (make it unit length)
    function normalize(v) {
        const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        return [v[0] / length, v[1] / length, v[2] / length];
    }

    // Subtract two vectors (v1 - v2)
    function subtract(v1, v2) {
        return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
    }

    // Cross product of two vectors
    function cross(v1, v2) {
        return [
            v1[1] * v2[2] - v1[2] * v2[1],
            v1[2] * v2[0] - v1[0] * v2[2],
            v1[0] * v2[1] - v1[1] * v2[0]
        ];
    }

    // Dot product of two vectors
    function dot(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    }

    // Calculate the view matrix
    function calculateViewMatrix(cameraPosition, cameraTarget, upDirection) {
        // Calculate the forward, right, and up vectors
        const forward = normalize(subtract(cameraPosition, cameraTarget));  // Camera looks towards target
        const right = normalize(cross(upDirection, forward));              // Right vector = cross(up, forward)
        const up = cross(forward, right);                                  // Recalculate the up vector to ensure orthogonality

        // Construct the view matrix (4x4)
        const viewMatrix = [
            right[0],   right[1],   right[2],   -dot(right, cameraPosition),
            up[0],      up[1],      up[2],      -dot(up, cameraPosition),
            -forward[0], -forward[1], -forward[2], dot(forward, cameraPosition),
            0,          0,          0,          1
        ];

        return viewMatrix;
    }

    // Example usage:
    let cameraPosition = [0, -1, 1];  // Camera at (0, 0, 5)
    let cameraTarget = [0, 0, 0];    // Camera looking at the origin
    let upDirection = [0, 1, 0];     // Y-up direction

    let viewMatrix = calculateViewMatrix(cameraPosition, cameraTarget, upDirection);

    const perspectiveMatrix = perspective(Math.PI / 2, myGame.render.core.getAspectRatio(), 0.01, 2);
    // const positionMatrix = [
    //     1, 0, 0, 0,
    //     0, 1, 0, 1,
    //     0, 0, 1, 1,
    //     0, 0, 0, 1,
    // ];
    return {
        perspectiveMatrix: perspectiveMatrix,
        positionMatrix: viewMatrix,
    };
    // const viewMatrix = lookAt([0 ,0, 0.5], [0, 0, 0], [0, 1, 0]);

    // const myMatrix = multiplyMatrices(viewMatrix, projectionMatrix);
}());