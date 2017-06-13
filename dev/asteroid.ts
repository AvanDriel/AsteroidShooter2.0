///<reference path="gameobject.ts"/>
class Asteroid extends Gameobject {

    constructor(x:number, y:number, game:Game){
        super("asteroid", 100, 100, x, y, game);

        this.game = game;
        this.speedY = 2;        
    }

    public moveAsteroid(){
        this.posY += this.speedY;
        this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";

        if(this.posY>(window.innerHeight+100)){
            this.game.removeAsteroid(this);
        }
    }

    public removeAsteroidDiv() {
        this.div.remove();
    }
}