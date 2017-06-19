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
        _this.speedY = 2;
        return _this;
    }
    Asteroid.prototype.moveAsteroid = function () {
        this.posY += this.speedY;
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        if (this.posY > (window.innerHeight + 100)) {
            this.game.removeAsteroid(this);
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
        this.div.innerHTML = 'Game over! Your score is :' + this.score;
        this.button.addEventListener("click", function () { return _this.deleteAll(); });
        document.body.appendChild(this.button);
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
var Game = (function () {
    function Game() {
        var _this = this;
        this.bullets = new Array();
        this.asteroids = new Array();
        this.score = 0;
        this.player = new Player(this);
        this.intervalID = setInterval(function () { return _this.createAsteroid(); }, 1400);
        this.div = document.createElement('score');
        document.body.appendChild(this.div);
        this.div.innerHTML = 'Score :' + this.score;
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
        for (var _d = 0, _e = this.bullets; _d < _e.length; _d++) {
            var b = _e[_d];
            for (var _f = 0, _g = this.asteroids; _f < _g.length; _f++) {
                var a = _g[_f];
                if (b.posX < a.posX + a.width &&
                    b.posX + b.width > a.posX &&
                    b.posY < a.posY + a.height &&
                    b.height + b.posY > a.posY) {
                    this.score = this.score + 10;
                    console.log(this.score);
                    this.div.innerHTML = 'Score :' + this.score;
                    this.removeBullet(b);
                    this.removeAsteroid(a);
                }
            }
        }
        for (var _h = 0, _j = this.asteroids; _h < _j.length; _h++) {
            var a = _j[_h];
            if (this.player.posX < a.posX + a.width &&
                this.player.posX + this.player.width > a.posX &&
                this.player.posY < a.posY + a.height &&
                this.player.height + this.player.posY > a.posY) {
                this.removePlayer(this.player);
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
        this.randomX = Math.floor((Math.random() * 1800) - 60);
        this.asteroids.push(new Asteroid(this.randomX, -80, this));
    };
    Game.prototype.removeAsteroid = function (a) {
        a.removeAsteroidDiv();
        var i = this.asteroids.indexOf(a);
        if (i != -1) {
            this.asteroids.splice(i, 1);
        }
    };
    Game.prototype.removeAllAsteroids = function () {
        for (var _i = 0, _a = this.asteroids; _i < _a.length; _i++) {
            var a = _a[_i];
            a.removeAsteroidDiv();
        }
        this.asteroids = [];
    };
    Game.prototype.removeAllBullets = function () {
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var b = _a[_i];
            b.removeBulletDiv();
        }
        this.bullets = [];
    };
    Game.prototype.removePlayer = function (p) {
        p.removePlayerDiv();
        this.endGame();
    };
    Game.prototype.endGame = function () {
        this.removeAllAsteroids();
        this.removeAllBullets();
        this.div.remove();
        this.div = undefined;
        clearInterval(this.intervalID);
        new EndScreen(this.score);
    };
    return Game;
}());
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
        this.button = document.createElement('start_but');
        this.button.addEventListener("click", function () { return _this.deleteAll(); });
        document.body.appendChild(this.button);
    }
    startScreen.prototype.deleteAll = function () {
        this.button.remove();
        this.button = undefined;
        new Game();
    };
    return startScreen;
}());
//# sourceMappingURL=main.js.map