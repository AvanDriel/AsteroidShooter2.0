class LiveCounter{

    public lives: number = 3;
    public liveCounter: HTMLElement;
    private game: Game;
    private width: number;
    private height: number;
    private posX: number;
    private posY: number;
    private live1: HTMLElement;
    private live2: HTMLElement;
    private live3: HTMLElement;

    constructor(g:Game){
        this.game = g;
        this.liveCounter = document.createElement('liveCounter');
        document.body.appendChild(this.liveCounter);
        this.liveCounter.innerHTML = 'Lives :';

        this.live1 = document.createElement('live1');
        document.body.appendChild(this.live1);
        this.live1.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";

        this.live2 = document.createElement('live2');
        document.body.appendChild(this.live2);
        this.live2.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";

        this.live3 = document.createElement('live3');
        document.body.appendChild(this.live3);
        this.live3.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";

    }

    public playerHit(){
        if(this.lives < 1){
            this.game.removePlayer(this.game.player);
            console.log('levens te laag');
        } else {
            if(this.lives == 3){
                this.live3.style.backgroundImage = "url('images/lives/PNGs/heart-empty.png')";
            } else if(this.lives == 2){
                this.live2.style.backgroundImage = "url('images/lives/PNGs/heart-empty.png')";
            } else if (this.lives == 1){
                this.live1.style.backgroundImage = "url('images/lives/PNGs/heart-empty.png')";
            }

            this.lives = this.lives - 1;
            console.log(this.lives);
        }  
    }

    public playerLiveUp(){
        if(this.lives < 3){
            if(this.lives == 0){
                this.live1.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";
            } else if(this.lives == 1){
                this.live2.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";
            } else if(this.lives == 2){
                this.live3.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";
            }

            this.lives = this.lives + 1;
        } else {
            //If you have max lives, get 25 points!
            this.game.score = this.game.score + 25;
            this.game.scoreCounter.innerHTML='Score :' + this.game.score;
        }       
    }
}