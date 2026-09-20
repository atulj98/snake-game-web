class Snake {

    constructor(startX, startY) {

        this.body = [
            { x: startX, y: startY },

            {
                x: startX - CELL_SIZE,
                y: startY
            },

            {
                x: startX - (2 * CELL_SIZE),
                y: startY
            }
        ];

        this.direction = Direction.RIGHT;

        // Turns waiting to be applied, one per tick.
        this.directionQueue = [];
    }

    get head() {

        return this.body[0];
    }

    changeDirection(newDirection) {

        // Compare against the last *queued* turn, not the
        // direction of the previous tick. Otherwise two key
        // presses inside one tick (RIGHT -> UP -> LEFT) slip
        // past the opposite check and the snake reverses
        // into its own neck.
        const lastDirection =
            this.directionQueue.length > 0
                ? this.directionQueue[
                    this.directionQueue.length - 1
                ]
                : this.direction;

        if (
            newDirection === lastDirection ||
            isOppositeDirection(
                lastDirection,
                newDirection
            )
        ) {
            return;
        }

        if (this.directionQueue.length < 2) {
            this.directionQueue.push(
                newDirection
            );
        }
    }

    move() {

        if (this.directionQueue.length > 0) {
            this.direction =
                this.directionQueue.shift();
        }

        let headX = this.head.x;
        let headY = this.head.y;

        switch (this.direction) {

            case Direction.UP:
                headY -= CELL_SIZE;
                break;

            case Direction.DOWN:
                headY += CELL_SIZE;
                break;

            case Direction.LEFT:
                headX -= CELL_SIZE;
                break;

            case Direction.RIGHT:
                headX += CELL_SIZE;
                break;
        }

        const newHead = {
            x: headX,
            y: headY
        };

        this.body.unshift(newHead);

        this.body.pop();
    }

    grow() {

        const tail = this.body[
            this.body.length - 1
        ];

        this.body.push({
            x: tail.x,
            y: tail.y
        });
    }

    draw(ctx) {

        this.body.forEach(
            (segment, index) => {

                ctx.fillStyle =
                    index === 0
                        ? SNAKE_HEAD_COLOR
                        : SNAKE_COLOR;

                ctx.fillRect(
                    segment.x,
                    segment.y,
                    CELL_SIZE - 1,
                    CELL_SIZE - 1
                );
            }
        );
    }
}