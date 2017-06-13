///<reference path="gameobject.ts"/>
class Bullet extends Gameobject {


    constructor(x:number, y:number, game:Game){
        super("bullet", 13, 45, x, y, game);

        this.game = game;
        this.speedX = 0;
        this.speedY = -10;

    }

     public moveBullet():void {
        this.posX += this.speedX;
        this.posY += this.speedY;
        this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";

        if(this.posY<-20){
            this.game.removeBullet(this);
        }

    }

    public removeBulletDiv() {
        this.div.remove();
    }
}