"use strict";
// Enemies our player must avoid
var Enemy = function(x, y, speed) {


	var firstY = [220, 60, 140, 220, 140, 60];
	var speeds = [50, 70, 100, 120, 150];

	this.x = -100; // Variables applied to each of our instances go here,
	this.y = firstY[Math.floor(Math.random() * 6)]; // we've provided one for you to get started
	this.speed = speeds[Math.floor(Math.random() * 5)];
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x = this.x + this.speed * dt;

	if (this.x > 505) {
		this.x = 0;
	}
	this.checkCollisions();

};

Enemy.prototype.reset = function() {


	this.x = x;
	this.y = y;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
	var rect1 = {
		x: player.x,
		y: player.y,
		width: 50,
		height: 50
	};
	var rect2 = {
		x: this.x,
		y: this.y,
		width: 50,
		height: 50
	};

	if (rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.height + rect1.y > rect2.y) {
		player.reset();
		player.life -= 1;
	}
};



var Player = function(x, y) {
	this.x = 200;
	this.y = 405;
	this.sprite = 'images/char-boy.png';
	this.score = 0;
	this.life = 3;

};

Player.prototype.reset = function() {
	this.x = 200;
	this.y = 405;
};

Player.prototype.update = function() {

	if (this.x >= 450 || this.x <= 0) {
		this.x = 210;
	}

	if (this.y >= 430) {
		this.y = 400;
	}

	if (this.y <= -3) {
		this.score += 1;
		this.reset();
		this.life -= 1;
	}

	document.getElementById('score').innerHTML = "SCORE: " + this.score;
	if (this.life === 0) {
		player.reset();
		document.getElementById('life').innerHTML = "YOU DIED!";
	} else {
		document.getElementById('life').innerHTML = "LIFE: " + this.life;
	}

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
			if (this.y <= 65) {
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

var gemImages = ['images/Gem-Orange.png', 'images/Gem-Blue.png', 'images/Gem-Green.png'];
var gemY = [220, 60, 140, 220, 140, 60];
var Gem = function() {
	this.gemX = [50, 150, 250, 350, 400];
	this.gemImg = gemImages[Math.floor(Math.random() * 3)];
	this.x = this.gemX[Math.floor(Math.random() * 5)];
	this.y = gemY[Math.floor(Math.random() * 6)];
};

Gem.prototype.update = function() {
	//this.checkCollisions();
};

Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.gemImg), this.x, this.y);
};

Gem.prototype.checkCollisions = function() {
	// calculate the bounding box objects' value
	var rect1 = {
		x: player.x,
		y: player.y,
		width: 50,
		height: 50
	};
	var rect2 = {
		x: this.x,
		y: this.y,
		width: 50,
		height: 50
	};

	if (rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.height + rect1.y > rect2.y) {
		this.gemImg = gemImages[Math.floor(Math.random() * 3)];
		this.x = this.gemX[Math.floor(Math.random() * 5)];
		this.y = gemY[Math.floor(Math.random() * 6)];
		player.score += 1;
	}
	document.getElementById('score').innerHTML = "SCORE: " + player.score;
};

// Place all enemy objects in an array called allEnemies

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

var gem = new Gem();
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