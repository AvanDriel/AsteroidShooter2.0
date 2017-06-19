///<reference path="gameobject.ts"/>

class Game {

    public player : Player;
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
    private lives: number = 3;
    public livecounter: LiveCounter;


    constructor() {
    
        this.player = new Player(this);

        //create asteroid every 1.4s
        this.intervalID = setInterval(()=> this.createAsteroid(), 1400);

        //create score
        this.div = document.createElement('score');
        document.body.appendChild(this.div);
        this.div.innerHTML = 'Score :' + this.score;
        //create livecounter
        this.livecounter = new LiveCounter(this);


        requestAnimationFrame(() => this.gameLoop());
    }
    
    private gameLoop(){
            //player movement
            this.player.move();

            //bullet movement
            for(let b of this.bullets){
                b.moveBullet();
            } 

            //asteroid movement
            for(let a of this.asteroids){
                a.moveAsteroid();
            }        

            //bullet-asteroid collision
            for(let b of this.bullets){
                for(let a of this.asteroids){
                    if (b.posX                    < a.posX + a.width &&
                        b.posX + b.width          > a.posX &&
                        b.posY                    < a.posY + a.height &&
                        b.height + b.posY         > a.posY) {  
                            //give 10 points for every asteroid hit
                            this.score = this.score+10;
                            this.div.innerHTML='Score :' + this.score;
                            this.removeBullet(b);  
                            this.removeAsteroid(a);
                    }
                }
            }

            //player-asteroid collision
            for(let a of this.asteroids){
                if (this.player.posX                    < a.posX + a.width &&
                    this.player.posX + this.player.width          > a.posX &&
                    this.player.posY                    < a.posY + a.height &&
                    this.player.height + this.player.posY         > a.posY) {  
                        this.removeAsteroid(a);
                        this.livecounter.playerHit();     
                }
            }
        
            requestAnimationFrame(() => this.gameLoop());   
    }

    //push bullet to array
    public addBullet(b:Bullet){
        this.bullets.push(b);
    }

    public removeBullet(b: Bullet) {
        // remove div
        b.removeBulletDiv();

        // delete bullet instance from array
		let i : number = this.bullets.indexOf(b);
		if(i != -1) {
			this.bullets.splice(i, 1);
		}
	}

    //create asteroid, push to array
    public createAsteroid(){
        this.randomX = Math.floor((Math.random() * (window.innerWidth)) - 60);
        this.asteroids.push(
            new Asteroid(this.randomX, -80, this)
             );
    }

    //remove asteroid
    public removeAsteroid(a: Asteroid){
        //get the asteroids position, create an explosion where the asteroid was hit
        let rect:ClientRect = a.div.getBoundingClientRect();
        this.createExplosion(rect.left, rect.top);
        // remove div
        a.removeAsteroidDiv();
        // delete asteroid instance from array
		let i : number = this.asteroids.indexOf(a);
		if(i != -1) {
			this.asteroids.splice(i, 1);
		}
    }

    //create explosion
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
        //create endscreen
        new EndScreen(this.score);

    }
    
}



