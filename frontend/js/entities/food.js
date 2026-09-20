class Food {

    constructor() {

        this.position = {
            x: 0,
            y: 0
        };

        this.spawn();
    }

    spawn(snake) {

        const maxX =
            GAME_WIDTH / CELL_SIZE;

        const maxY =
            GAME_HEIGHT / CELL_SIZE;

        let position;

        do {

            position = {
                x:
                    Math.floor(
                        Math.random() * maxX
                    ) * CELL_SIZE,

                y:
                    Math.floor(
                        Math.random() * maxY
                    ) * CELL_SIZE
            };

        } while (
            snake &&
            snake.body.some(
                segment =>
                    segment.x === position.x &&
                    segment.y === position.y
            )
        );

        this.position = position;
    }

    draw(ctx) {

        ctx.fillStyle = FOOD_COLOR;

        ctx.fillRect(
            this.position.x,
            this.position.y,
            CELL_SIZE - 1,
            CELL_SIZE - 1
        );
    }
}