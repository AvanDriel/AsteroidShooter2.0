///<reference path="gameobject.ts"/>
class Explosion extends Gameobject {

    private intervalID:number;

    constructor(x:number, y:number, game:Game){
        super("explosion", 100, 100, x, y, game);
        this.game = game;
        this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
        //explosion sound
        var audio = new Audio('../docs/sounds/Explosion.mp3');
        audio.play();
        //remove explosion after animation is done
        this.intervalID = setInterval(()=> this.removeExplosionDiv(), 1400);
                
    }


    public removeExplosionDiv() {
        this.div.remove();
        clearInterval(this.intervalID);
    }
}