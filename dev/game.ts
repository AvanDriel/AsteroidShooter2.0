///<reference path="gameobject.ts"/>

class Game {

    private player : Player;
    public bullets:Array<Bullet> = new Array<Bullet>();
    private bullet: Bullet;
    public asteroids:Array<Asteroid> = new Array<Asteroid>();
    private asteroid : Asteroid;
    private randomX: number;
    private intervalID:number;
    private counter: number = 0;

    constructor() {
    
        this.player = new Player(this);

        this.intervalID = setInterval(()=> this.createAsteroid(), 1400);

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

        for(let b of this.bullets){
            for(let a of this.asteroids){
                 if (b.posX                    < a.posX + a.width &&
                     b.posX + b.width          > a.posX &&
                     b.posY                    < a.posY + a.height &&
                     b.height + b.posY         > a.posY) {  
                        this.counter = this.counter+10;
                        console.log(this.counter);

                        this.removeBullet(b);
                        this.removeAsteroid(a);
                }
            }
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

    public createAsteroid(){
        this.randomX = Math.floor((Math.random() * 1800) - 60);
        this.asteroids.push(
            new Asteroid(this.randomX, -80, this)
             );
    }

    public removeAsteroid(a: Asteroid){
       //this.style.backgroundimage ();
       
        // div verwijderen
        a.removeAsteroidDiv();

        // bullet instance verwijderen uit de array
		let i : number = this.asteroids.indexOf(a);
		if(i != -1) {
			this.asteroids.splice(i, 1);
		}
    }
    
}



