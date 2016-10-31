"use strict";


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    
    this.x = -100; // Variables applied to each of our instances go here,
    this.y = 0; // we've provided one for you to get started
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;

    if (this.x > 500) {
        this.reset();
    }
    var bugXLeftRange = this.x - 50;
    var bugXRightRange = this.x + 50;
    var bugYTopRange = this.y - 50;
    var bugYBottomRange = this.y + 50;

    if (player.x > bugXLeftRange && player.x < bugXRightRange && player.y > bugYTopRange && player.y < bugYBottomRange) {
        player.resetPlayerPosition();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Enemy.prototype.reset = function() {
    this.col = -2;
    this.row = getRandomIntInclusive(1, 3);
    this.x = x * this.col;
    this.y = y * this.row;
    this.speed = getRandomIntInclusive(1, 6);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.


var Player = function(x, y) {
    this.x = 200;
    this.y = 405;
    this.sprite = 'images/char-boy.png';

};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 405;
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x <= 50) {
                this.x = 5;
            } else {
                this.x -= 100;
            }
            break;

        case 'right':
            if (this.x >= 350) {
                this.x = 405;
            } else {
                this.x += 100;
            }
            break;

        case 'up':
            if (this.y <= 87) {
                this.y = 5;
            } else {
                this.y -= 83;
            }
            break;

        case 'down':
            if (this.y >= 400) {
                this.y = 400;
            } else {
                this.y += 83;
            }
            break;
    }
};

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i <= 3; i++) {
    var enemySpeed = Math.floor(Math.random() * 5 + 1) * 75;
    allEnemies.push(new Enemy(-60, 60 + 85 * i, enemySpeed));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});