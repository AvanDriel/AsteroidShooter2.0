class EndScreen {
    public button: HTMLElement;
    private div : HTMLElement;
    private score : number;

    constructor(score:number) {
        this.score = score;
        this.button = document.createElement('restart_but');

        this.div = document.createElement('endScreen');
        document.body.appendChild(this.div);
        this.div.innerHTML = 'Game over! Your score is : ' + this.score;
        
        this.button.addEventListener("click", () => this.deleteAll());
        document.body.appendChild(this.button);

        //animation of div
        TweenLite.set(this.div, {x:0, y:-450});
        TweenLite.to(this.div, 1, {y:150, ease:Bounce.easeOut});
        
        //animation of button
        TweenLite.set(this.button, {x:0, y:-750});
        TweenLite.to(this.button, 1, {y:-300, ease:Bounce.easeOut});

    }

    deleteAll() {
        this.button.remove();
        this.button = undefined;
        this.div.remove();
        this.div = undefined;

        new Game();

    }

}