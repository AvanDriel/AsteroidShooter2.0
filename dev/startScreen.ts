class startScreen {
    public button: HTMLElement;

    constructor() {
        var audio = new Audio('../docs/sounds/soundtrack.mp3');
        audio.play();   
        this.button = document.createElement('start_but');
        
        this.button.addEventListener("click", () => this.deleteAll());
        document.body.appendChild(this.button);
    }
    deleteAll() {
        this.button.remove();
        this.button = undefined;

        new Game();

    }

}