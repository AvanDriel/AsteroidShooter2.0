var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Gameobject = (function () {
    function Gameobject(htmlTag, width, height, posX, posY, game) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.div = document.createElement(htmlTag);
        document.body.appendChild(this.div);
    }
    return Gameobject;
}());
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(x, y, game) {
        var _this = _super.call(this, "asteroid", 100, 100, x, y, game) || this;
        _this.game = game;
        if (_this.game.score > 500) {
            _this.speedY = 3;
        }
        else if (_this.game.score > 800) {
            _this.speedY = 4;
        }
        else if (_this.game.score > 1200) {
            _this.speedY = 5;
        }
        else {
            _this.speedY = 2;
        }
        return _this;
    }
    Asteroid.prototype.moveAsteroid = function () {
        this.posY += this.speedY;
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        if (this.posY > (window.innerHeight + 100)) {
            this.game.removeAsteroid(this);
            this.game.livecounter.playerHit();
        }
    };
    Asteroid.prototype.removeAsteroidDiv = function () {
        this.div.remove();
    };
    return Asteroid;
}(Gameobject));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, game) {
        var _this = _super.call(this, "bullet", 13, 45, x, y, game) || this;
        _this.game = game;
        _this.speedX = 0;
        _this.speedY = -10;
        return _this;
    }
    Bullet.prototype.moveBullet = function () {
        this.posX += this.speedX;
        this.posY += this.speedY;
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
        if (this.posY < -20) {
            this.game.removeBullet(this);
        }
    };
    Bullet.prototype.removeBulletDiv = function () {
        this.div.remove();
    };
    return Bullet;
}(Gameobject));
var EndScreen = (function () {
    function EndScreen(score) {
        var _this = this;
        this.score = score;
        this.button = document.createElement('restart_but');
        this.div = document.createElement('endScreen');
        document.body.appendChild(this.div);
        this.div.innerHTML = 'Game over! Your score is : ' + this.score;
        this.button.addEventListener("click", function () { return _this.deleteAll(); });
        document.body.appendChild(this.button);
        TweenLite.set(this.div, { x: 0, y: -450 });
        TweenLite.to(this.div, 1, { y: 150, ease: Bounce.easeOut });
        TweenLite.set(this.button, { x: 0, y: -750 });
        TweenLite.to(this.button, 1, { y: -300, ease: Bounce.easeOut });
    }
    EndScreen.prototype.deleteAll = function () {
        this.button.remove();
        this.button = undefined;
        this.div.remove();
        this.div = undefined;
        new Game();
    };
    return EndScreen;
}());
var Explosion = (function (_super) {
    __extends(Explosion, _super);
    function Explosion(x, y, game) {
        var _this = _super.call(this, "explosion", 100, 100, x, y, game) || this;
        _this.game = game;
        _this.div.style.transform = "translate(" + _this.posX + "px," + _this.posY + "px)";
        var audio = new Audio('../docs/sounds/Explosion.mp3');
        audio.play();
        _this.intervalID = setInterval(function () { return _this.removeExplosionDiv(); }, 1400);
        return _this;
    }
    Explosion.prototype.removeExplosionDiv = function () {
        this.div.remove();
        clearInterval(this.intervalID);
    };
    return Explosion;
}(Gameobject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.bullets = new Array();
        this.asteroids = new Array();
        this.liveUps = new Array();
        this.score = 0;
        this.explosions = new Array();
        this.lives = 3;
        this.player = new Player(this);
        this.intervalID = setInterval(function () { return _this.createAsteroid(); }, 1400);
        this.liveUpIntervalID = setInterval(function () { return _this.createLiveUp(); }, 15000);
        this.scoreCounter = document.createElement('score');
        document.body.appendChild(this.scoreCounter);
        this.scoreCounter.innerHTML = 'Score :' + this.score;
        this.livecounter = new LiveCounter(this);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player.move();
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var b = _a[_i];
            b.moveBullet();
        }
        for (var _b = 0, _c = this.asteroids; _b < _c.length; _b++) {
            var a = _c[_b];
            a.moveAsteroid();
        }
        for (var _d = 0, _e = this.liveUps; _d < _e.length; _d++) {
            var l = _e[_d];
            l.moveLiveUp();
        }
        for (var _f = 0, _g = this.bullets; _f < _g.length; _f++) {
            var b = _g[_f];
            for (var _h = 0, _j = this.asteroids; _h < _j.length; _h++) {
                var a = _j[_h];
                if (b.posX < a.posX + a.width &&
                    b.posX + b.width > a.posX &&
                    b.posY < a.posY + a.height &&
                    b.height + b.posY > a.posY) {
                    this.score = this.score + 10;
                    this.scoreCounter.innerHTML = 'Score :' + this.score;
                    this.removeBullet(b);
                    this.removeAsteroid(a);
                }
            }
        }
        for (var _k = 0, _l = this.asteroids; _k < _l.length; _k++) {
            var a = _l[_k];
            if (this.player.posX < a.posX + a.width &&
                this.player.posX + this.player.width > a.posX &&
                this.player.posY < a.posY + a.height &&
                this.player.height + this.player.posY > a.posY) {
                this.removeAsteroid(a);
                this.livecounter.playerHit();
            }
        }
        for (var _m = 0, _o = this.liveUps; _m < _o.length; _m++) {
            var l = _o[_m];
            if (this.player.posX < l.posX + l.width &&
                this.player.posX + this.player.width > l.posX &&
                this.player.posY < l.posY + l.height &&
                this.player.height + this.player.posY > l.posY) {
                this.removeLiveUp(l);
                this.livecounter.playerLiveUp();
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.addBullet = function (b) {
        this.bullets.push(b);
    };
    Game.prototype.removeBullet = function (b) {
        b.removeBulletDiv();
        var i = this.bullets.indexOf(b);
        if (i != -1) {
            this.bullets.splice(i, 1);
        }
    };
    Game.prototype.createAsteroid = function () {
        this.randomX = Math.floor((Math.random() * (window.innerWidth)) - 50);
        this.asteroids.push(new Asteroid(this.randomX, -80, this));
    };
    Game.prototype.createLiveUp = function () {
        this.randomX = Math.floor((Math.random() * (window.innerWidth)) - 18);
        this.liveUps.push(new LiveUp(this.randomX, -80, this));
    };
    Game.prototype.removeAsteroid = function (a) {
        var rect = a.div.getBoundingClientRect();
        this.createExplosion(rect.left, rect.top);
        a.removeAsteroidDiv();
        var i = this.asteroids.indexOf(a);
        if (i != -1) {
            this.asteroids.splice(i, 1);
        }
    };
    Game.prototype.removeLiveUp = function (l) {
        l.removeLiveUpDiv();
        var i = this.liveUps.indexOf(l);
        if (i != -1) {
            this.liveUps.splice(i, 1);
        }
    };
    Game.prototype.createExplosion = function (x, y) {
        var e = new Explosion(x, y, this);
        this.explosions.push(e);
    };
    Game.prototype.removeAllAsteroids = function () {
        for (var _i = 0, _a = this.asteroids; _i < _a.length; _i++) {
            var a = _a[_i];
            a.removeAsteroidDiv();
        }
        this.asteroids = [];
    };
    Game.prototype.removeAllLiveUps = function () {
        for (var _i = 0, _a = this.liveUps; _i < _a.length; _i++) {
            var l = _a[_i];
            l.removeLiveUpDiv();
        }
        this.liveUps = [];
    };
    Game.prototype.removeAllBullets = function () {
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var b = _a[_i];
            b.removeBulletDiv();
        }
        this.bullets = [];
    };
    Game.prototype.removePlayer = function (p) {
        var rect = p.div.getBoundingClientRect();
        this.createExplosion(rect.left, rect.top);
        p.removePlayerDiv();
        this.endGame();
    };
    Game.prototype.endGame = function () {
        this.removeAllAsteroids();
        this.removeAllBullets();
        this.removeAllLiveUps();
        this.scoreCounter.remove();
        this.scoreCounter = undefined;
        clearInterval(this.intervalID);
        clearInterval(this.liveUpIntervalID);
        new EndScreen(this.score);
    };
    return Game;
}());
var LiveCounter = (function () {
    function LiveCounter(g) {
        this.lives = 3;
        this.game = g;
        this.liveCounter = document.createElement('liveCounter');
        document.body.appendChild(this.liveCounter);
        this.liveCounter.innerHTML = 'Lives :';
        this.live1 = document.createElement('live1');
        document.body.appendChild(this.live1);
        this.live1.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";
        this.live2 = document.createElement('live2');
        document.body.appendChild(this.live2);
        this.live2.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";
        this.live3 = document.createElement('live3');
        document.body.appendChild(this.live3);
        this.live3.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";
    }
    LiveCounter.prototype.playerHit = function () {
        if (this.lives < 1) {
            this.game.removePlayer(this.game.player);
            console.log('levens te laag');
        }
        else {
            if (this.lives == 3) {
                this.live3.style.backgroundImage = "url('images/lives/PNGs/heart-empty.png')";
            }
            else if (this.lives == 2) {
                this.live2.style.backgroundImage = "url('images/lives/PNGs/heart-empty.png')";
            }
            else if (this.lives == 1) {
                this.live1.style.backgroundImage = "url('images/lives/PNGs/heart-empty.png')";
            }
            this.lives = this.lives - 1;
            console.log(this.lives);
        }
    };
    LiveCounter.prototype.playerLiveUp = function () {
        if (this.lives < 3) {
            if (this.lives == 0) {
                this.live1.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";
            }
            else if (this.lives == 1) {
                this.live2.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";
            }
            else if (this.lives == 2) {
                this.live3.style.backgroundImage = "url('images/lives/PNGs/heart-full.png')";
            }
            this.lives = this.lives + 1;
        }
        else {
            this.game.score = this.game.score + 25;
            this.game.scoreCounter.innerHTML = 'Score :' + this.game.score;
        }
    };
    return LiveCounter;
}());
var LiveUp = (function (_super) {
    __extends(LiveUp, _super);
    function LiveUp(x, y, game) {
        var _this = _super.call(this, "liveUp", 36, 32, x, y, game) || this;
        _this.game = game;
        _this.speedY = 2;
        return _this;
    }
    LiveUp.prototype.moveLiveUp = function () {
        this.posY += this.speedY;
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        if (this.posY > (window.innerHeight + 100)) {
            this.game.removeLiveUp(this);
        }
    };
    LiveUp.prototype.removeLiveUpDiv = function () {
        this.div.remove();
    };
    return LiveUp;
}(Gameobject));
window.addEventListener("load", function () {
    new startScreen();
});
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(g) {
        var _this = _super.call(this, "player", 64, 64, (window.innerWidth / 2 - 32), (window.innerHeight) - 100, g) || this;
        _this.leftKey = 65;
        _this.leftKeyHit = false;
        _this.leftSpeed = 0;
        _this.rightKey = 68;
        _this.rightKeyHit = false;
        _this.rightSpeed = 0;
        _this.spacebar = 32;
        _this.spacebarHit = false;
        _this.game = g;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Player.prototype.move = function () {
        if (this.posX < 1) {
            this.leftSpeed = 0;
        }
        else {
            this.posX -= this.leftSpeed;
            this.div.style.transform = "translate(" + this.posX + "vx," + this.posY + "px)";
        }
        if (this.posX > (window.innerWidth - 64)) {
            this.rightSpeed = 0;
        }
        else {
            this.posX += this.rightSpeed;
            this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        }
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.leftKey:
                this.leftSpeed = 10;
                break;
            case this.rightKey:
                this.rightSpeed = 10;
                break;
            case this.spacebar:
                this.playerFire();
        }
    };
    Player.prototype.onKeyUp = function (event) {
        this.leftSpeed = this.rightSpeed = 0;
    };
    Player.prototype.playerFire = function () {
        var rect = this.div.getBoundingClientRect();
        var b = new Bullet(rect.left + 26, rect.top - 31, this.game);
        this.game.addBullet(b);
        var audio = new Audio('../docs/sounds/laser.mp3');
        audio.play();
    };
    Player.prototype.removePlayerDiv = function () {
        this.div.remove();
    };
    return Player;
}(Gameobject));
var startScreen = (function () {
    function startScreen() {
        var _this = this;
        var audio = new Audio('../docs/sounds/soundtrack.mp3');
        audio.play();
        this.title = document.createElement('title');
        this.title.innerHTML = 'Welcome to the original Asteroid Shooter!';
        document.body.appendChild(this.title);
        this.text = document.createElement('text');
        this.text.innerHTML = "Shoot the asteroids before they hit the Earth, and don't get hit yourself";
        document.body.appendChild(this.text);
        this.description = document.createElement('text');
        this.description.innerHTML = 'Move left and right with the A and D key, press spacebar to shoot';
        document.body.appendChild(this.description);
        this.button = document.createElement('start_but');
        this.button.addEventListener("click", function () { return _this.deleteAll(); });
        document.body.appendChild(this.button);
        TweenLite.set(this.title, { x: 0, y: -450 });
        TweenLite.to(this.title, 1, { y: 150, ease: Bounce.easeOut });
        TweenLite.set(this.text, { x: 0, y: -500 });
        TweenLite.to(this.text, 1, { y: 300, ease: Bounce.easeOut });
        TweenLite.set(this.description, { x: 0, y: -500 });
        TweenLite.to(this.description, 1, { y: 350, ease: Bounce.easeOut });
        TweenLite.set(this.button, { x: 0, y: -400 });
        TweenLite.to(this.button, 1, { y: 500, ease: Bounce.easeOut });
    }
    startScreen.prototype.deleteAll = function () {
        this.text.remove();
        this.text = undefined;
        this.description.remove();
        this.description = undefined;
        this.title.remove();
        this.title = undefined;
        this.button.remove();
        this.button = undefined;
        new Game();
    };
    return startScreen;
}());
//# sourceMappingURL=main.js.map