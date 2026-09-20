class CollisionDetector {

    static hitWall(position) {

        return (
            position.x < 0 ||
            position.x >= GAME_WIDTH ||
            position.y < 0 ||
            position.y >= GAME_HEIGHT
        );
    }

    static hitSelf(snake) {

        const head = snake.head;

        return snake.body
            .slice(1)
            .some(
                segment =>
                    segment.x === head.x &&
                    segment.y === head.y
            );
    }

    static hitFood(snake, food) {

        return (
            snake.head.x === food.position.x &&
            snake.head.y === food.position.y
        );
    }
}