class startScreen {
    public button: HTMLElement;
    public title: HTMLElement;
    public text: HTMLElement;
    public description: HTMLElement;

    constructor() {
        var audio = new Audio('../docs/sounds/soundtrack.mp3');
        audio.play();   
        
        //create title
        this.title = document.createElement('title');
        this.title.innerHTML = 'Welcome to the original Asteroid Shooter!';
        document.body.appendChild(this.title);

        // create game description
        this.text = document.createElement('text');
        this.text.innerHTML = "Shoot the asteroids before they hit the Earth, and don't get hit yourself"
        document.body.appendChild(this.text);

        //creating description for controls
        this.description = document.createElement('text');
        this.description.innerHTML = 'Move left and right with the A and D key, press spacebar to shoot'
        document.body.appendChild(this.description);

        //create start_but div.
        this.button = document.createElement('start_but');
        this.button.addEventListener("click", () => this.deleteAll());
        document.body.appendChild(this.button);


        //Dropdown animation for the title
        TweenLite.set(this.title, {x:0, y:-450});
        TweenLite.to(this.title, 1, {y:150, ease:Bounce.easeOut});

        //Dropdown animation for description text
        TweenLite.set(this.text, {x:0, y:-500})
        TweenLite.to(this.text, 1, {y:300, ease:Bounce.easeOut});

        //Dropdown animation for description controls
        TweenLite.set(this.description, {x:0, y:-500})
        TweenLite.to(this.description, 1, {y:350, ease:Bounce.easeOut});

        //Dropdown animation for Button
        TweenLite.set(this.button, {x:0, y:-400});
        TweenLite.to(this.button,1, {y:500, ease:Bounce.easeOut});
    }
    deleteAll() {
        this.text.remove();
        this.text = undefined;
        this.description.remove();
        this.description = undefined;
        this.title.remove();
        this.title = undefined;
        this.button.remove();
        this.button = undefined;

        new Game();


    }

}