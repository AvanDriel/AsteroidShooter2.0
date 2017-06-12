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
    function Gameobject(htmlTag, width, height, posX, posY) {
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
    function Asteroid(x, y) {
        var _this = _super.call(this, "asteroid", 64, 64, x, y) || this;
        _this.speedY = 2;
        return _this;
    }
    Asteroid.prototype.moveAsteroid = function () {
        this.posY += this.speedY;
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
    };
    return Asteroid;
}(Gameobject));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, game) {
        var _this = _super.call(this, "bullet", 20, 20, x, y) || this;
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
var Game = (function () {
    function Game() {
        var _this = this;
        this.bullets = new Array();
        this.asteroids = new Array();
        this.player = new Player(this);
        for (var i = 0; i < 200; i++) {
            this.addAsteroid();
            window.setInterval(this.addAsteroid, 1000);
        }
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
    Game.prototype.addAsteroid = function () {
        var a = new Asteroid(Math.floor((Math.random() * (window.innerWidth))) - 80, -50);
        this.asteroids.push(a);
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(g) {
        var _this = _super.call(this, "player", 64, 64, (window.innerWidth / 2 - 32), (window.innerHeight) - 100) || this;
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
                this.leftSpeed = 7;
                break;
            case this.rightKey:
                this.rightSpeed = 7;
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
        console.log("plaats een kogel op " + rect.left + " , " + rect.top);
        var b = new Bullet(rect.left + 26, rect.top - 31, this.game);
        this.game.addBullet(b);
    };
    return Player;
}(Gameobject));
//# sourceMappingURL=main.js.map