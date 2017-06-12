///<reference path="gameobject.ts"/>

class Game {

    private player : Player;
    public bullets:Array<Bullet> = new Array<Bullet>();
    private bullet: Bullet;
    public asteroids:Array<Asteroid> = new Array<Asteroid>();
    private asteroid : Asteroid;

    constructor() {
        console.log((window.innerWidth));
    
        this.player = new Player(this);

        for(let i = 0; i < 200; i++){
            this.addAsteroid();
            window.setInterval(this.addAsteroid, 1000);
        }

        requestAnimationFrame(() => this.gameLoop());  
    }
    
    private gameLoop(){
        this.player.move();

        for(let b of this.bullets){
            b.moveBullet();
        }     

        for(let a of this.asteroids){
            a.moveAsteroid();
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

    public addAsteroid(){
        this.asteroids.push(new Asteroid(Math.floor((Math.random() * (window.innerWidth)))-80, -50));
    }
}



