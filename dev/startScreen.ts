class startScreen {
    public button: HTMLElement;
    public title: HTMLElement;
    public text: HTMLElement;
    public discription: HTMLElement;

    constructor() {
        var audio = new Audio('../docs/sounds/soundtrack.mp3');
        audio.play();   
        
        //create title
        this.title = document.createElement('title');
        this.title.innerHTML = 'Welkom bij DE orginele Asteroid Shooter.';
        document.body.appendChild(this.title);

        // create game description
        this.text = document.createElement('text');
        this.text.innerHTML = 'Om de game te kunnen spelen druk je op start.'
        document.body.appendChild(this.text);

        //creating description for controls
        this.discription = document.createElement('text');
        this.discription.innerHTML = 'Controls: A & D om te bewegen, spatie om te schieten.'
        document.body.appendChild(this.discription);

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
        TweenLite.set(this.discription, {x:0, y:-500})
        TweenLite.to(this.discription, 1, {y:350, ease:Bounce.easeOut});

        //Dropdown animation for Button
        TweenLite.set(this.button, {x:0, y:-400});
        TweenLite.to(this.button,1, {y:500, ease:Bounce.easeOut});
    }
    deleteAll() {
        this.text.remove();
        this.text = undefined;
        this.discription.remove();
        this.discription = undefined;
        this.title.remove();
        this.title = undefined;
        this.button.remove();
        this.button = undefined;

        new Game();


    }

}