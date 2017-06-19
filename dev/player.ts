class Player extends Gameobject{

//Determine keys you can press
    private leftKey : number = 65;      // A key
    public leftKeyHit : boolean = false;
    public leftSpeed : number = 0;

    private rightKey : number = 68;     // D key
    public rightKeyHit : boolean = false;
    public rightSpeed : number = 0;
    
    private spacebar : number = 32;     // Spacebar
    public spacebarHit : boolean = false;

    constructor(g:Game){
        //in the super, give element name, w/h and start position
        super("player", 64, 64, (window.innerWidth /2 - 32), (window.innerHeight) - 100, g);
        
        this.game = g;

        // this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";

        //add keypress listener
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));
    }

    public move(){
        if(this.posX < 1){
            this.leftSpeed = 0;
        } else {
            this.posX -= this.leftSpeed;
            this.div.style.transform = "translate("+this.posX+"vx,"+this.posY+"px)";
        }
        
        if(this.posX > (window.innerWidth-64)){
             this.rightSpeed = 0;
        }else {
            this.posX += this.rightSpeed;
            this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
        }

    
    }

    //what happens when you press the declared keys
     onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){  
        case this.leftKey:
            this.leftSpeed = 10;
            break;
        case this.rightKey:
            this.rightSpeed = 10;
            break;
        case this.spacebar:
            this.playerFire(); 

        }
    }

    //and what if you let them go? 
    onKeyUp(event:KeyboardEvent):void {
        this.leftSpeed = this.rightSpeed =0;
    }

    //Let the spaceship shoot!
    public playerFire():void {

        let rect:ClientRect = this.div.getBoundingClientRect();      

        let b:Bullet = new Bullet(rect.left + 26, rect.top - 31, this.game);
        this.game.addBullet(b);

        var audio = new Audio('../docs/sounds/laser.mp3');
        audio.play();  
    }

    public removePlayerDiv() {
        this.div.remove();
    }


}