import { Pokemon } from './pokemon.js';
import { logAction } from './log.js';

const btnKick = document.getElementById('btn-kick');
const btnRandomAttack = document.getElementById('btn-random-attack');
const progressbarCharacter = document.getElementById('progressbar-character');
const healthCharacter = document.getElementById('health-character');
const progressbarEnemy = document.getElementById('progressbar-enemy');
const healthEnemy = document.getElementById('health-enemy');
const progressbarMewtwo = document.getElementById('progressbar-mewtwo');
const healthMewtwo = document.getElementById('health-mewtwo');
const logContainer = document.getElementById('logs');

const character = new Pokemon('Гравець', 100, progressbarCharacter, healthCharacter);
const enemy = new Pokemon('Charmander', 100, progressbarEnemy, healthEnemy);
const mewtwo = new Pokemon('Mewtwo', 100, progressbarMewtwo, healthMewtwo);

const attackBothEnemies = () => {
    const damageToEnemy = Math.floor(Math.random() * 20) + 5;
    const damageToMewtwo = Math.floor(Math.random() * 20) + 5;

    if (enemy.takeDamage(damageToEnemy)) {
        checkVictory(enemy.name);
    } else {
        logAction(logContainer, 'Charmander', damageToEnemy, enemy.health);
    }

    if (mewtwo.takeDamage(damageToMewtwo)) {
        checkVictory(mewtwo.name);
    } else {
        logAction(logContainer, 'Mewtwo', damageToMewtwo, mewtwo.health);
    }
};

const randomAttack = () => {
    const damage = Math.floor(Math.random() * 15) + 5;
    const target = Math.random() < 0.5 ? enemy : mewtwo;

    if (target.takeDamage(damage)) {
        checkVictory(target.name);
    } else {
        logAction(logContainer, target.name, damage, target.health);
    }
};

function checkVictory(name) {
    alert(`Ви перемогли ${name}!`);
    resetGame();
}

function resetGame() {
    setTimeout(function() {
        character.health = 100;
        enemy.health = 100;
        mewtwo.health = 100;
        character.updateHealth();
        enemy.updateHealth();
        mewtwo.updateHealth();
        alert('Гра скинута! Почніть новий бій!');
        logContainer.innerHTML = '';

        kickHandler.reset();
        randomAttackHandler.reset();
    }, 2000);
}

const createButtonHandler = (button, limit, action) => {
    let clicks = 0;

    const handler = () => {
        if (clicks < limit) {
            clicks++;
            console.log(`Кнопка "${button.textContent}" натиснута ${clicks} раз. Залишилось ${limit - clicks} натискань.`);
            action();
        } else {
            console.log(`Ліміт натискань на кнопку "${button.textContent}" вичерпано.`);
            button.disabled = true;
        }
    };

    handler.reset = () => {
        clicks = 0;
        button.disabled = false;
        console.log(`Кнопка "${button.textContent}" знову доступна.`);
    };

    return handler;
};

const kickHandler = createButtonHandler(btnKick, 6, attackBothEnemies);
const randomAttackHandler = createButtonHandler(btnRandomAttack, 6, randomAttack);

btnKick.addEventListener('click', kickHandler);
btnRandomAttack.addEventListener('click', randomAttackHandler);
