class HUD {

    constructor() {

        this.scoreElement =
            document.getElementById("score");

        this.statusElement =
            document.getElementById("status");
    }

    updateScore(score) {

        this.scoreElement.textContent =
            `Score: ${score}`;
    }

    updateStatus(status) {

        this.statusElement.textContent =
            status;
    }
}