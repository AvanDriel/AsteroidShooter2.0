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
var Game = (function () {
    function Game() {
        var _this = this;
        this.spaceship = new Spaceship;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.spaceship.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
var Character = (function () {
    function Character(htmlTag, width, height, posX, posY, speedX, speedY) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.div = document.createElement(htmlTag);
        document.body.appendChild(this.div);
    }
    Character.prototype.move = function () {
        this.posX += this.speedX;
        this.posY += this.speedY;
        this.draw();
    };
    Character.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
    };
    return Character;
}());
window.addEventListener("load", function () {
    new Game();
});
var Spaceship = (function (_super) {
    __extends(Spaceship, _super);
    function Spaceship() {
        var _this = _super.call(this, "spaceship", 64, 64, (window.innerWidth / 2 - 32), 50, 0, 0) || this;
        _this.div.style.transform = "translate(" + _this.posX + "px," + _this.posY + "px)";
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Spaceship.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 87:
                this.speedY = 1;
                console.log("move up plz");
                break;
            case 83:
                this.speedY = -1;
                break;
            case 65:
                this.speedX = -1;
                break;
            case 68:
                this.speedX = 1;
        }
    };
    Spaceship.prototype.onKeyUp = function (event) {
        this.speedX = 0;
        this.speedY = 0;
    };
    return Spaceship;
}(Character));
//# sourceMappingURL=main.js.map