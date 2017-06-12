class Player extends Gameobject{

//Determine keys you can press
    private leftKey : number = 65;      // A key
    public leftKeyHit : boolean = false;
    public speedX : number = 0;

    private rightKey : number = 68;     // D key
    public rightKeyHit : boolean = false;
    
    private spacebar : number = 32;     // Spacebar
    public spacebarHit : boolean = false;

    constructor(g:Game){
        //in the super, give element name, w/h and start position
        super("player", 64, 64, (window.innerWidth /2 - 32), (window.innerHeight) - 100);
        
        this.game = g;

        this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";

        //add keypress listener
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));
    }

    public move(){
        if(this.posX < 1){
            this.speedX = 0;
        }else if(this.posX > (window.innerWidth)){
             this.speedX = 0;
        } else {
            this.posX += this.speedX;
            this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
        }
    }

    //what happens when you press the declared keys
     onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.leftKey:
            this.speedX = -7;
            break;
        case this.rightKey:
            this.speedX = 7;
            break;
        case this.spacebar:
            this.playerFire(); 

        }
    }

    //and what if you let them go? 
    onKeyUp(event:KeyboardEvent):void {
        this.speedX = 0;
    }

    //Let the spaceship shoot!
    public playerFire():void {

        let rect:ClientRect = this.div.getBoundingClientRect();      
        console.log("plaats een kogel op " + rect.left + " , " + rect.top);

        let b:Bullet = new Bullet(rect.left + 26, rect.top - 31);
        this.game.addBullet(b);
    }


}