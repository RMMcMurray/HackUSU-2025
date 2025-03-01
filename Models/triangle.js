myGame.triangle = (function () {
    //points of the triangle
    let vertex1 = [0, 0, -0.5];
    let vertex2 = [0.5, 0.5, 0.5];
    let vertex3 = [-0.5, 0.5, 0.5];
    let vertex4 = [0, -0.5, 0.5];

    let red = [.88, 0.04, 0.09];
    let yellow = [.96, .7, 0];
    let green = [0.2, .6, 0];
    let blue = [0, 0, .6];

    let that = {
        // Defines the vertices of the triangle
        vertices: [
            ...vertex1,
            ...vertex2,
            ...vertex3,

            ...vertex1,
            ...vertex3,
            ...vertex4,

            ...vertex1,
            ...vertex4,
            ...vertex2,

            ...vertex2,
            ...vertex3,
            ...vertex4
        ],
        indices: [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8,
            9, 10, 11
        ],
        vertexColors: [
            ...red,
            ...red,
            ...red,
            ...yellow,
            ...yellow,
            ...yellow,
            ...green,
            ...green,
            ...green,
            ...blue,
            ...blue,
            ...blue
            
        ],
    };
    let speed = 0.01;
    let rotationSpeed = 0.01;
    return that;
}());