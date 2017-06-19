class EndScreen {
    public button: HTMLElement;
    private div : HTMLElement;
    private score : number;

    constructor(score:number) {
        this.score = score;
        this.button = document.createElement('restart_but');

        this.div = document.createElement('endScreen');
        document.body.appendChild(this.div);
        this.div.innerHTML = 'Game over! Your score is :' + this.score;
        
        this.button.addEventListener("click", () => this.deleteAll());
        document.body.appendChild(this.button);
    }

    deleteAll() {
        this.button.remove();
        this.button = undefined;
        this.div.remove();
        this.div = undefined;

        new Game();

    }

}