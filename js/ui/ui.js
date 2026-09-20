class GameUI {

    constructor() {

        this.overlay =
            document.getElementById(
                "gameOverlay"
            );

        this.title =
            document.getElementById(
                "overlayTitle"
            );

        this.message =
            document.getElementById(
                "overlayMessage"
            );
    }

    showOverlay(title, message) {

        this.title.textContent = title;

        this.message.textContent = message;

        this.overlay.classList.remove(
            "hidden"
        );
    }

    hideOverlay() {

        this.overlay.classList.add(
            "hidden"
        );
    }
}