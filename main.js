const $btnKick = document.getElementById('btn-kick');
const $btnHeavyKick = document.getElementById('btn-heavy-kick');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbarHP: document.getElementById('progressbar-character'),
    renderHP: function () {
        this.renderHPLife();
        this.renderProgressbarHP();
    },
    renderHPLife: function () {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },
    renderProgressbarHP: function () {
        this.elProgressbarHP.style.width = (this.damageHP / this.defaultHP) * 100 + '%';
        this.elProgressbarHP.classList.remove('low', 'critical');

        if (this.damageHP > 60) {
        } else if (this.damageHP > 30) {
            this.elProgressbarHP.classList.add('low');
        } else {
            this.elProgressbarHP.classList.add('critical');
        }
    },
    attack: function (damage) {
        if (this.damageHP < damage) {
            this.damageHP = 0;
            alert('Бідний ' + this.name + ' програв бій!');
        } else {
            this.damageHP -= damage;
        }
        this.renderHP();
    }
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbarHP: document.getElementById('progressbar-enemy'),
    renderHP: character.renderHP,
    renderHPLife: character.renderHPLife,
    renderProgressbarHP: character.renderProgressbarHP,
    attack: character.attack
};

const enemy2 = {
    name: 'Mewtwo',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy2'),
    elProgressbarHP: document.getElementById('progressbar-enemy2'),
    renderHP: character.renderHP,
    renderHPLife: character.renderHPLife,
    renderProgressbarHP: character.renderProgressbarHP,
    attack: character.attack
};

$btnKick.addEventListener('click', function () {
    console.log('Kick');
    character.attack(random(20));
    enemy.attack(random(20));
    enemy2.attack(random(20));
});

$btnHeavyKick.addEventListener('click', function () {
    console.log('Heavy Kick');
    character.attack(random(40));
    enemy.attack(random(40));
    enemy2.attack(random(40));
});

function init() {
    console.log('Start game!');
    character.renderHP();
    enemy.renderHP();
    enemy2.renderHP();
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

init();
