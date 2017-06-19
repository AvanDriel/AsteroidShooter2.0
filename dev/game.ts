///<reference path="gameobject.ts"/>

class Game {

    private player : Player;
    public bullets:Array<Bullet> = new Array<Bullet>();
    private bullet: Bullet;
    public asteroids:Array<Asteroid> = new Array<Asteroid>();
    private asteroid : Asteroid;
    private randomX: number;
    private intervalID:number;
    public score: number = 0;
    private div:HTMLElement;
    public explosions:Array<Explosion> = new Array<Explosion>();
    private explosion: Explosion;


    constructor() {
    
        this.player = new Player(this);

        this.intervalID = setInterval(()=> this.createAsteroid(), 1400);

        this.div = document.createElement('score');
        document.body.appendChild(this.div);
        this.div.innerHTML = 'Score :' + this.score;

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
                            this.score = this.score+10;
                            console.log(this.score);
                            this.div.innerHTML='Score :' + this.score;

                            this.removeBullet(b);  
                            this.removeAsteroid(a);
                    }
                }
            }

            
                for(let a of this.asteroids){
                    if (this.player.posX                    < a.posX + a.width &&
                        this.player.posX + this.player.width          > a.posX &&
                        this.player.posY                    < a.posY + a.height &&
                        this.player.height + this.player.posY         > a.posY) {  

                            this.removePlayer(this.player);
                    
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
        this.randomX = Math.floor((Math.random() * (window.innerWidth)) - 60);
        this.asteroids.push(
            new Asteroid(this.randomX, -80, this)
             );
    }


    public removeAsteroid(a: Asteroid){
        let rect:ClientRect = a.div.getBoundingClientRect();
        this.createExplosion(rect.left, rect.top);
        // div verwijderen
        a.removeAsteroidDiv();

        // asteroid instance verwijderen uit de array
		let i : number = this.asteroids.indexOf(a);
		if(i != -1) {
			this.asteroids.splice(i, 1);
		}
    }

    public createExplosion(x:number, y:number){
            let e = new Explosion(x, y, this)
            this.explosions.push(e);
            
    }
    
//remove all game objects
    public removeAllAsteroids(){
        for(let a of this.asteroids){
            a.removeAsteroidDiv();
        }  
        this.asteroids = [];
    }

    public removeAllBullets(){
        for(let b of this.bullets){
            b.removeBulletDiv();
        }
        this.bullets = [];
    }

    public removePlayer(p: Player){
        let rect:ClientRect = p.div.getBoundingClientRect();
        this.createExplosion(rect.left, rect.top);
        p.removePlayerDiv();
        this.endGame();
    }

    public endGame() {
        this.removeAllAsteroids();
        this.removeAllBullets();
        this.div.remove();
        this.div = undefined;
        clearInterval(this.intervalID);
        new EndScreen(this.score);

    }
    
}



