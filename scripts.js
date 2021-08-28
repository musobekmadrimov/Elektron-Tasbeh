const resetButton = document.getElementById("resetButton");
const display = document.getElementById("display");
const underDisplay = document.getElementById("marta");
const incrementButton = document.getElementById("incrementButton");

const tasbeh = {
    count: 0,
    marta: 0
}

function reset() {
    tasbeh.count = 0;
    tasbeh.marta = 0;
    display.innerText = tasbeh.count;
    underDisplay.innerText = tasbeh.marta;
}

function increment() {
    if (tasbeh.count === 33) {
        tasbeh.marta += 1;
        tasbeh.count = 1;
        display.innerText = tasbeh.count;
        underDisplay.innerText = tasbeh.marta;
        console.log(tasbeh.marta)
    } else {
        tasbeh.count += 1;
        display.innerText = tasbeh.count;
    }

}

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = "!<>-_\\/[]{}—=+*^?#________";
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || "";
            const to = newText[i] || "";
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
    "coded by",
    "Musobek Madrimov",
    "https://github.com/musobekmadrimov",
    "https://instagram.com/musobekmadrimov",
    "https://t.me/musobekmadrimov",
    "+998(99)966-1999",
    "Uzbekistan, Khorezm, Urgench"
];

const el = document.querySelector(".text");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 800);
    });
    counter = (counter + 1) % phrases.length;
};

next();

document.body.onkeydown = function(e) {
    if (e.keyCode == 32) {
        increment();
    }
    if (e.keyCode == 13) {
        increment();
    }
    if (e.keyCode == 27) {
        reset();
    }
}
