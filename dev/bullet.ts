///<reference path="gameobject.ts"/>
class Bullet extends Gameobject {


    constructor(x:number, y:number){
        super("bullet", 20, 20, x, y);

        this.speedX = 0;
        this.speedY = -10;

        this.move();
    }

     public move():void {
        this.posX += this.speedX;
        this.posY += this.speedY;
        this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
    }
}