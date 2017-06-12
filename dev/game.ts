class Game {

    protected spaceship : Spaceship;
    // private asteroid : Asteroid;
    // private bullet:Bullet;
    // private bullets:Array<Bullet> = new Array<Bullet>();
    // private enemy:Enemy;
    // private enemies: Array<Enemy> = new Array <Enemy>();

    constructor() {
        this.spaceship = new Spaceship;

        // for(let i=0; i<3; i++){
        //     this.enemies.push(new Enemy(50, 50, this));
        // }

        requestAnimationFrame(() => this.gameLoop());  
    }
    
    private gameLoop(){

    //spaceship movement
    this.spaceship.move();

    //bullet movement
    // for(let b of this.bullets){
    //         b.move();
    //     }  
             
        requestAnimationFrame(() => this.gameLoop());
    }

    //push bullets to game
    // public addBullet(b:Bullet){
    //     this.bullets.push(b);
    // }

    // public removeBullet(b: Bullet) {
    //     // div verwijderen
    //     b.removeBulletDiv();

    //     // bullet instance verwijderen uit de array
	// 	let i : number = this.bullets.indexOf(b);
	// 	if(i != -1) {
	// 		this.bullets.splice(i, 1);
	// 	}
	// 	console.log("Aantal is " + this.bullets.length);
	// }
} 

