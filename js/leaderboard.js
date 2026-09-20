class Leaderboard {

    constructor() {

        this.container =
            document.getElementById(
                "leaderboard"
            );
    }

    async load() {

        try {

            const data =
                await getLeaderboard(10, 0);

            this.render(
                data.scores
            );

        } catch (error) {

            console.error(
                "Failed to load leaderboard:",
                error
            );

            this.container.innerHTML =
                "<p>Unable to load leaderboard.</p>";
        }
    }

    render(scores) {

        if (scores.length === 0) {

            this.container.innerHTML =
                "<p>No scores yet.</p>";

            return;
        }

        this.container.innerHTML =
            scores
                .map(
                    (score, index) => `
                        <div class="leaderboard-row">
                            <span>${index + 1}</span>
                            <span>${score.player_name}</span>
                            <span>${score.score}</span>
                        </div>
                    `
                )
                .join("");
    }
}