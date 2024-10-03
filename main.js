const $btnKick = document.getElementById('btn-kick');
const $btnHeavyKick = document.getElementById('btn-heavy-kick');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbarHP: document.getElementById('progressbar-character'),
  };
  
const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbarHP: document.getElementById('progressbar-enemy'),
};

const enemy2 = {
    name: 'Mewtwo',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy2'),
    elProgressbarHP: document.getElementById('progressbar-enemy2'),
};

$btnKick.addEventListener('click', function () {
    console.log('Kick');
    attack(random(20), character);
    attack(random(20), enemy);
    attack(random(20), enemy2);
});

$btnHeavyKick.addEventListener('click', function () {
    console.log('Heavy Kick');
    attack(random(40), character);
    attack(random(40), enemy);
    attack(random(40), enemy2);
});

function init() {
    console.log('Start game!');
    renderHP(character);
    renderHP(enemy);
    renderHP(enemy2);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbarHP.style.width = (person.damageHP / person.defaultHP) * 100 + '%';

    person.elProgressbarHP.classList.remove('low', 'critical');

    if (person.damageHP > 60) {
    } else if (person.damageHP > 30) {
        person.elProgressbarHP.classList.add('low'); 
    } else {
        person.elProgressbarHP.classList.add('critical'); 
    }
}

function attack(damage, person) {
    if (person.damageHP < damage) {
        person.damageHP = 0;
        alert('Бідний ' + person.name + ' програв бій!');
    } else {
        person.damageHP -= damage;
    }
    renderHP(person);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}
init();