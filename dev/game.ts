///<reference path="gameobject.ts"/>

class Game {

    private player : Player;
    public bullets:Array<Bullet> = new Array<Bullet>();
    private bullet: Bullet;

    constructor() {
        console.log((window.innerWidth));
    
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

    public removeBullet(b: Bullet) {
        // div en listeners verwijderen
        b.removeBulletDiv();

        // ball instance verwijderen uit de array
		let i : number = this.bullets.indexOf(b);
		if(i != -1) {
			this.bullets.splice(i, 1);
		}
	}

} 

