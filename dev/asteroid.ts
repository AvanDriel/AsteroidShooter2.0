///<reference path="gameobject.ts"/>
class Asteroid extends Gameobject {

    constructor(x:number, y:number, game:Game){
        super("asteroid", 100, 100, x, y, game);

        this.game = game;
        
        //speed up the game after x score
        if (this.game.score > 500){
            this.speedY = 3;
        } else if(this.game.score > 800){
            this.speedY = 4;
        }else if(this.game.score > 1200){
            this.speedY = 5;    
        } else {
            this.speedY = 2; 
        }     
    }

    public moveAsteroid(){
        this.posY += this.speedY;
        this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";

        if(this.posY>(window.innerHeight+100)){
            this.game.removeAsteroid(this);
            this.game.livecounter.playerHit();
        }
    }

    public removeAsteroidDiv() {
        this.div.remove();
    }
}