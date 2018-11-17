class alien {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = true;
    }

    test() {
        alert("czesc");
    }

    kill() {
        this.alive = false;
    }
}

class bulet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visible = false;
        this.active = false;
    }

    mouveUp() {
        this.y = this.y - 12;
        this.visible = true;
        if (this.y <= 0) {
            this.kill();
        }

    }

    start(x, y) {
        this.visible = true;
        this.active = true;
        this.x = x;
        this.y = y;
    }

    kill() {
        this.visible = false;
    }
}