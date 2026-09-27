class ThemeManager {

    constructor() {

        this.toggleButton =
            document.getElementById(
                "themeToggle"
            );

        this.icon =
            this.toggleButton.querySelector(
                ".theme-toggle-icon"
            );

        this.text =
            this.toggleButton.querySelector(
                ".theme-toggle-text"
            );

        this.theme =
            this.getInitialTheme();

        this.applyTheme(
            this.theme
        );

        this.bindEvents();
    }


    getInitialTheme() {

        try {

            const savedTheme =
                localStorage.getItem(
                    "snake-theme"
                );

            if (
                savedTheme === "light" ||
                savedTheme === "dark"
            ) {

                return savedTheme;
            }

        } catch (error) {

            console.warn(
                "Unable to read saved theme."
            );
        }


        return window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches
            ? "light"
            : "dark";
    }


    bindEvents() {

        this.toggleButton.addEventListener(
            "click",
            () => {

                this.toggle();
            }
        );


        // Prevent game keyboard controls
        // from reacting while the theme
        // button has keyboard focus.

        this.toggleButton.addEventListener(
            "keydown",
            event => {

                event.stopPropagation();
            }
        );
    }


    toggle() {

        this.theme =
            this.theme === "dark"
                ? "light"
                : "dark";

        this.applyTheme(
            this.theme
        );

        try {

            localStorage.setItem(
                "snake-theme",
                this.theme
            );

        } catch (error) {

            console.warn(
                "Unable to save theme."
            );
        }
    }


    applyTheme(theme) {

        document.documentElement.dataset.theme =
            theme;

        const darkMode =
            theme === "dark";


        this.icon.textContent =
            darkMode
                ? "☀️"
                : "🌙";


        this.text.textContent =
            darkMode
                ? "Light"
                : "Dark";


        this.toggleButton.setAttribute(
            "aria-label",
            darkMode
                ? "Switch to light theme"
                : "Switch to dark theme"
        );
    }
}


new ThemeManager();