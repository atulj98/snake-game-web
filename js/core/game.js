class Game {

    constructor(leaderboard) {

        this.leaderboard =
            leaderboard;

        this.canvas =
            document.getElementById(
                "gameCanvas"
            );
        
        this.playerNameInput =
            document.getElementById(
                "playerName"
            );

        this.startOverlay =
            document.getElementById(
                "startOverlay"
        );
        
        this.startGameButton =
            document.getElementById(
                "startGameButton"
        );

        this.ctx =
            this.canvas.getContext("2d");

        this.snake =
            new Snake(200, 300);

        this.food =
            new Food();

        this.score =
            new Score();

        this.hud =
            new HUD();

        this.ui =
            new GameUI();

        this.state =
            GameState.PAUSED;
        
        this.running = true;
        
        this.food.spawn(
            this.snake
        );
        
        this.bindEvents();
        
        this.showStartScreen();
        
        this.start();
    }

    bindEvents() {

        document.addEventListener(
            "keydown",
            event => {

                this.handleKeyboardInput(
                    event
                );
            }
        );

        document
            .querySelectorAll(
                "[data-direction]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const direction =
                            button.dataset
                                .direction
                                .toUpperCase();

                        this.handleDirection(
                            direction
                        );
                    }
                );
            });
        
        this.startGameButton.addEventListener(
                "click",
                () => {
            
                    this.startGame();
                }
        );
    }

    showStartScreen() {

        this.startOverlay.classList.remove(
            "hidden"
        );
    
        this.playerNameInput.focus();
    }

    startGame() {

        const playerName =
            this.playerNameInput.value.trim();
    
        if (playerName === "") {
    
            this.playerNameInput.focus();
    
            return;
        }
    
        this.startOverlay.classList.add(
            "hidden"
        );
    
        this.state =
            GameState.PLAYING;
    
        this.hud.updateScore(
            this.score.value
        );
    
        this.hud.updateStatus(
            "Playing"
        );
    }

    handleKeyboardInput(event) {

        if (
            !this.startOverlay.classList.contains(
                "hidden"
            )
        ) {
        
            if (event.key === "Enter") {
        
                event.preventDefault();
        
                this.startGame();
            }
        
            return;
        }

        // Arrow keys scroll the page by default, which
        // drags the board around on shorter screens.
        if (event.key.startsWith("Arrow")) {
            event.preventDefault();
        }

        switch (event.key) {

            case "ArrowUp":
            case "w":
            case "W":

                this.handleDirection(
                    Direction.UP
                );

                break;

            case "ArrowDown":
            case "s":
            case "S":

                this.handleDirection(
                    Direction.DOWN
                );

                break;

            case "ArrowLeft":
            case "a":
            case "A":

                this.handleDirection(
                    Direction.LEFT
                );

                break;

            case "ArrowRight":
            case "d":
            case "D":

                this.handleDirection(
                    Direction.RIGHT
                );

                break;

            case " ":

                event.preventDefault();

                this.togglePause();

                break;

            case "r":
            case "R":

                this.restart();

                break;
        }
    }

    handleDirection(direction) {

        if (
            this.state !==
            GameState.PLAYING
        ) {
            return;
        }

        this.snake.changeDirection(
            direction
        );
    }

    update() {

        if (
            this.state !==
            GameState.PLAYING
        ) {
            return;
        }

        this.snake.move();

        if (
            CollisionDetector.hitWall(
                this.snake.head
            ) ||
            CollisionDetector.hitSelf(
                this.snake
            )
        ) {

            this.gameOver();

            return;
        }

        if (
            CollisionDetector.hitFood(
                this.snake,
                this.food
            )
        ) {

            this.snake.grow();

            this.score.increase();

            this.hud.updateScore(
                this.score.value
            );

            this.food.spawn(
                this.snake
            );
        }
    }

    draw() {

        this.ctx.fillStyle =
            BACKGROUND_COLOR;

        this.ctx.fillRect(
            0,
            0,
            GAME_WIDTH,
            GAME_HEIGHT
        );

        this.drawGrid();

        this.snake.draw(
            this.ctx
        );

        this.food.draw(
            this.ctx
        );
    }

    drawGrid() {

        this.ctx.strokeStyle =
            "rgba(255,255,255,0.03)";

        for (
            let x = 0;
            x <= GAME_WIDTH;
            x += CELL_SIZE
        ) {

            this.ctx.beginPath();

            this.ctx.moveTo(x, 0);

            this.ctx.lineTo(
                x,
                GAME_HEIGHT
            );

            this.ctx.stroke();
        }

        for (
            let y = 0;
            y <= GAME_HEIGHT;
            y += CELL_SIZE
        ) {

            this.ctx.beginPath();

            this.ctx.moveTo(0, y);

            this.ctx.lineTo(
                GAME_WIDTH,
                y
            );

            this.ctx.stroke();
        }
    }

    togglePause() {

        if (
            this.state ===
            GameState.GAME_OVER
        ) {
            return;
        }

        if (
            this.state ===
            GameState.PLAYING
        ) {

            this.state =
                GameState.PAUSED;

            this.hud.updateStatus(
                "Paused"
            );

            this.ui.showOverlay(
                "PAUSED",
                "Press Space to Resume"
            );

        } else {

            this.state =
                GameState.PLAYING;

            this.hud.updateStatus(
                "Playing"
            );

            this.ui.hideOverlay();
        }
    }

    
    
    getPlayerName() {
        return this.playerNameInput.value.trim();
    }

    async gameOver() {

        this.state =
            GameState.GAME_OVER;
    
        this.hud.updateStatus(
            "Game Over"
        );
    
        const playerName =
            this.getPlayerName();
    
        try {
    
            await saveScore(
                playerName,
                this.score.value
            );
            
            await this.leaderboard.load();

            console.log(
                "Score saved successfully"
            );
    
        } catch (error) {
    
            console.error(
                "Failed to save score:",
                error
            );
        }
    
        this.ui.showOverlay(
            "GAME OVER",
            `Score: ${this.score.value} • Press R to Restart`
        );
    }

    restart() {

        this.snake =
            new Snake(200, 300);

        this.food =
            new Food();

        this.score.reset();

        this.food.spawn(
            this.snake
        );

        this.state =
            GameState.PLAYING;

        this.hud.updateScore(0);

        this.hud.updateStatus(
            "Playing"
        );

        this.ui.hideOverlay();
    }

    start() {

        const interval =
            1000 / FPS;

        setInterval(
            () => {

                this.update();

                this.draw();

            },
            interval
        );

        this.draw();
    }
}

const leaderboard =
    new Leaderboard();

leaderboard.load();

new Game(leaderboard);