const Direction = Object.freeze({
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT"
});

const OppositeDirection = Object.freeze({

    [Direction.UP]: Direction.DOWN,

    [Direction.DOWN]: Direction.UP,

    [Direction.LEFT]: Direction.RIGHT,

    [Direction.RIGHT]: Direction.LEFT

});

function isOppositeDirection(
    currentDirection,
    newDirection
) {
    return (
        OppositeDirection[currentDirection]
        === newDirection
    );
}