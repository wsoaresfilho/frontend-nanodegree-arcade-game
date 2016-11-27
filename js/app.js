var enemyStart = [60, 143, 226]; // The three positions of the rows for the enemies

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.startX = -101; // Start position
    this.x = this.startX;
    this.y = enemyStart[ Math.floor(Math.random() * 3)]; // Random Y position
    this.speed = (Math.random() * 5) + 1; // Random speed (from 1 to 6)

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * 90 * dt);
    this.restartPosition();
    this.checkForCollision();
};

Enemy.prototype.restartPosition = function() {
    if (this.x >= 510) {
        this.x = this.startX;
        this.y = enemyStart[ Math.floor(Math.random() * 3)];
    }
};

Enemy.prototype.checkForCollision = function() {
    if (this.y == player.y) {
        if ((this.x + 83 > player.x) && (this.x < player.x + 83)) {
            player.reset();
            console.log("You loose!")
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.startX = 202;
    this.startY = 392;
    this.stepX = 101;
    this.stepY = 83;
    this.x = this.startX;
    this.y = this.startY;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.startY;
};

Player.prototype.handleInput = function(keyCode) {
    // Move up the player
    if (keyCode == "up") {
        if (this.y > 60) { // Limit for the movement
            this.y = this.y - this.stepY;
        } else {
            console.log("Congratulations!");
            this.reset(); // Reset the position because the player won the game
        }
    }
    // Move down the player
    if (keyCode == "down") {
        if (this.y < 392) { // Limit for the movement
            this.y = this.y + this.stepY;
        }
    }
    // Move right the player
    if (keyCode == "right") {
        if (this.x < 404) { // Limit for the movement
            this.x = this.x + this.stepX;
        }
    }
    // Move left the player
    if (keyCode == "left") {
        if (this.x > 0) { // Limit for the movement
            this.x = this.x - this.stepX;
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
allEnemies.push(enemy1, enemy2, enemy3);


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
