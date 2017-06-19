///<reference path="gameobject.ts"/>
class LiveUp extends Gameobject {

    constructor(x:number, y:number, game:Game){
        super("liveUp", 36, 32, x, y, game);

        this.game = game;
        this.speedY = 2; 
        
    }

    public moveLiveUp(){
        this.posY += this.speedY;
        this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";

        if(this.posY>(window.innerHeight+100)){
            this.game.removeLiveUp(this);
        }
    }

    public removeLiveUpDiv() {
        this.div.remove();
    }
}