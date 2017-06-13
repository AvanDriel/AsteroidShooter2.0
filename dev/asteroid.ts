///<reference path="gameobject.ts"/>
class Asteroid extends Gameobject {

    constructor(x:number, y:number){
        super("asteroid", 64, 64, x, y);
        console.log(x, y);
        this.speedY = 2;        
    }

    public moveAsteroid(){
        this.posY += this.speedY;
        this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
    }
}