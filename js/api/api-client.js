const API_BASE_URL = "https://snake-game-web-zl1d.onrender.com";


async function getLeaderboard(limit = 10, offset = 0) {
    const response = await fetch(
        `${API_BASE_URL}/api/scores/top?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
    }

    return response.json();
}


async function saveScore(playerName, score) {
    const response = await fetch(
        `${API_BASE_URL}/api/scores`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                player_name: playerName,
                score: score
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to save score");
    }

    return response.json();
}