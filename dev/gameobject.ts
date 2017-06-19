class Gameobject {

    protected div:HTMLElement;
    public width: number;
    public height: number;
    public posX: number;
    public posY: number;
    protected speedX: number;
    protected speedY: number;
    protected player: Player;
    protected game: Game;

    constructor(htmlTag: string, width: number, height: number, posX: number, posY:number, game:Game){
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;

        this.div = document.createElement(htmlTag);
        document.body.appendChild(this.div);
    }
}