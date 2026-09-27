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
    
                const isHead =
                    index === 0;
    
                const isTail =
                    index === this.body.length - 1;
    
                // Draw tail separately
                if (isTail) {
                    this.drawTail(ctx);
                    return;
                }
    
                // Head / body
                ctx.fillStyle =
                    isHead
                        ? SNAKE_HEAD_COLOR
                        : SNAKE_COLOR;
    
                ctx.fillRect(
                    segment.x,
                    segment.y,
                    CELL_SIZE - 1,
                    CELL_SIZE - 1
                );
    
                // Eyes only on head
                if (isHead) {
    
                    ctx.fillStyle =
                        SNAKE_EYES;
    
                    ctx.fillRect(
                        segment.x + 5,
                        segment.y + 5,
                        3,
                        3
                    );
    
                    ctx.fillRect(
                        segment.x + CELL_SIZE - 8,
                        segment.y + 5,
                        3,
                        3
                    );
                }
            }
        );
    }
    
    
    drawTail(ctx) {
    
        const tail =
            this.body[
                this.body.length - 1
            ];
    
        const beforeTail =
            this.body[
                this.body.length - 2
            ];
    
        const dx =
            tail.x - beforeTail.x;
    
        const dy =
            tail.y - beforeTail.y;
    
        const size =
            CELL_SIZE - 1;
    
        const centerX =
            tail.x + size / 2;
    
        const centerY =
            tail.y + size / 2;
    
        ctx.fillStyle =
            SNAKE_COLOR;
    
        ctx.beginPath();
    
        // Tail points LEFT
        if (dx < 0) {
    
            ctx.moveTo(
                tail.x,
                centerY
            );
    
            ctx.lineTo(
                tail.x + size,
                tail.y + 3
            );
    
            ctx.lineTo(
                tail.x + size,
                tail.y + size - 3
            );
        }
    
        // Tail points RIGHT
        else if (dx > 0) {
    
            ctx.moveTo(
                tail.x + size,
                centerY
            );
    
            ctx.lineTo(
                tail.x,
                tail.y + 3
            );
    
            ctx.lineTo(
                tail.x,
                tail.y + size - 3
            );
        }
    
        // Tail points UP
        else if (dy < 0) {
    
            ctx.moveTo(
                centerX,
                tail.y
            );
    
            ctx.lineTo(
                tail.x + 3,
                tail.y + size
            );
    
            ctx.lineTo(
                tail.x + size - 3,
                tail.y + size
            );
        }
    
        // Tail points DOWN
        else if (dy > 0) {
    
            ctx.moveTo(
                centerX,
                tail.y + size
            );
    
            ctx.lineTo(
                tail.x + 3,
                tail.y
            );
    
            ctx.lineTo(
                tail.x + size - 3,
                tail.y
            );
        }
    
        // Happens briefly when grow()
        // duplicates the last segment.
        else {
    
            ctx.fillRect(
                tail.x,
                tail.y,
                size,
                size
            );
    
            return;
        }
    
        ctx.closePath();
        ctx.fill();
    }
}