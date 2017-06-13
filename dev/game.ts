///<reference path="gameobject.ts"/>

class Game {

    private player : Player;
    public bullets:Array<Bullet> = new Array<Bullet>();
    private bullet: Bullet;
    public asteroids:Array<Asteroid> = new Array<Asteroid>();
    private asteroid : Asteroid;
    private randomX: number;

    constructor() {
    
        this.player = new Player(this);

        this.randomX = Math.floor((Math.random() * 1800) + 1);
        console.log(this.randomX);
        // this.asteroids.push(
            new Asteroid(this.randomX, 10)
            // );

        requestAnimationFrame(() => this.gameLoop());
    }
    
    private gameLoop(){
        this.player.move();

        for(let b of this.bullets){
            b.moveBullet();
        }            

        requestAnimationFrame(() => this.gameLoop());
    }

    public addBullet(b:Bullet){
        this.bullets.push(b);
    }

    public removeBullet(b: Bullet) {
        // div verwijderen
        b.removeBulletDiv();

        // bullet instance verwijderen uit de array
		let i : number = this.bullets.indexOf(b);
		if(i != -1) {
			this.bullets.splice(i, 1);
		}
	}
    
}



