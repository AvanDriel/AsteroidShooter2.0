///<reference path="gameobject.ts"/>

class Game {

    private player : Player;
    public bullets:Array<Bullet> = new Array<Bullet>();
    private bullet: Bullet;

    constructor() {
    
        this.player = new Player(this);

        requestAnimationFrame(() => this.gameLoop());  
    }
    
    private gameLoop(){
        this.player.move();

        for(let b of this.bullets){
            b.move();
        }
             
        requestAnimationFrame(() => this.gameLoop());
    }

    public addBullet(b:Bullet){
        this.bullets.push(b);
    }
} 

