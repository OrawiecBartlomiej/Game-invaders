let canvas, c, i1, i2,player,alive, aliens = [], bullets = [];

function start() {
    canvas = document.getElementById('can');
    c = canvas.getContext('2d');
    alienImage = document.getElementById("alien01");
    playerImage = document.getElementById("player01");
    rocketImage = document.getElementById("rocket01");
    backImage = document.getElementById("back");
    player = new Player(270, 540);
    addEnemies(4);

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if (keyName == " ") {
            if (bullets.length < 3)
                bullets.push(new Bullet(player.x + 30, player.y));
        }
        else if (keyName == "ArrowLeft") player.moveLeft();
        else if (keyName == "ArrowRight") player.moveRight();
    });

    i1 = setInterval(function () {
        redraw(new State(player, aliens, bullets));
    }, 80);

    i2 = setInterval(function () {
        attack(new State(player, aliens, bullets));
    }, 150);
}


class State {
    constructor(player, aliens, bullets) {
        this.aliens = aliens;
        this.player = player;
        this.bullets = bullets;
    }
}

function addEnemies(level) {
    if (level > 5 || level < 1) level = 1;
    for (let y = 0; y < level; y++) {
        for (let x = 55; x <= 530; x += 110) {
            aliens.push(new Alien(x, 40 + y * 70));
        }
    }
    alive = aliens.length;
}

function attack(state){
    for (a of state.aliens) {
        a.y += 5;
        if(a.y > 490 && a.alive) end(0);
        if(alive <= 0) end(1);
    }
}

function end(status){
    clearInterval(i1);
    clearInterval(i2);
    c.font = "30px Arial";
    c.fillStyle = "White";
    if(status == 0) c.fillText("Game over!",220,200);
    else c.fillText("You win!",230,200);
    setTimeout(function(){ location.reload(); }, 3000);
}


function redraw(state) {
    c.drawImage(backImage,0,0);


    c.drawImage(playerImage, state.player.x, state.player.y);

    for (a of state.aliens) {
        for(b of state.bullets){
            if(intersects(a, 60, 60, b, 10, 20)){
                a.alive = false;
                b.alive = false;
                alive-=1;
            }
        }
        if (a.alive) c.drawImage(alienImage, a.x, a.y);
    }

    for (b of state.bullets) {
        if (!b.alive) bullets.splice(0, 1);
        b.moveUp();
        c.drawImage(rocketImage, b.x, b.y);
    }
}

intersects = function (a, aw, ah, b, bw, bh) {
    if(!a.alive) return false;
    return !(b.x > (a.x + aw-1) ||
        (b.x + bw) < a.x+1 ||
        b.y > (a.y + ah) ||
        (b.y + bh) < a.y);
};

class Alien {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = true;
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = true;
    }
    moveUp() {
        this.y = this.y - 20;
        if (this.y <= 0) {
            this.kill();
        }
    }
    kill() {
        this.alive = false;
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    moveLeft() {
        if (this.x - 30 >= 0)
            this.x = this.x - 30;
    }
    moveRight() {
        if (this.x + 30 <= 540) this.x = this.x + 30;
    }
}

