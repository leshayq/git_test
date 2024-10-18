const btnKick = document.getElementById('btn-kick');
const btnRandomAttack = document.getElementById('btn-random-attack');
const progressbarCharacter = document.getElementById('progressbar-character');
const healthCharacter = document.getElementById('health-character');
const progressbarEnemy = document.getElementById('progressbar-enemy');
const healthEnemy = document.getElementById('health-enemy');
const progressbarMewtwo = document.getElementById('progressbar-mewtwo');
const healthMewtwo = document.getElementById('health-mewtwo');
const logContainer = document.getElementById('logs');

const character = {
    health: 100,
    progressbar: progressbarCharacter,
    healthText: healthCharacter,
    updateHealth() {
        const { health, progressbar, healthText } = this;
        const healthPercentage = (health / 100) * 100;
    
        progressbar.style.width = `${healthPercentage}%`;
    
        progressbar.classList.remove('low', 'critical');
    

        if (healthPercentage < 20) {
            progressbar.classList.add('critical'); 
        } else if (healthPercentage < 60) {
            progressbar.classList.add('low'); 
        }
    
        healthText.textContent = `${health} / 100`;
    }
};

const enemy = {
    health: 100,
    progressbar: progressbarEnemy,
    healthText: healthEnemy,
    updateHealth() {
        const { health, progressbar, healthText } = this;
        const healthPercentage = (health / 100) * 100;
    
        progressbar.style.width = `${healthPercentage}%`;
    
        progressbar.classList.remove('low', 'critical');
    
        if (healthPercentage < 20) {
            progressbar.classList.add('critical'); 
        } else if (healthPercentage < 60) {
            progressbar.classList.add('low'); 
        }
    
        healthText.textContent = `${health} / 100`;
    }
};

const mewtwo = {
    health: 100,
    progressbar: progressbarMewtwo,
    healthText: healthMewtwo,
    updateHealth() {
        const { health, progressbar, healthText } = this;
        const healthPercentage = (health / 100) * 100;
    
        progressbar.style.width = `${healthPercentage}%`;
    
        progressbar.classList.remove('low', 'critical');
    
        if (healthPercentage < 20) {
            progressbar.classList.add('critical'); 
        } else if (healthPercentage < 60) {
            progressbar.classList.add('low'); 
        }
    
        healthText.textContent = `${health} / 100`;
    }
};

const logs = [
    '[ПЕРСОНАЖ №1] згадав щось важливе, але несподівано [ПЕРСОНАЖ №2] вдарив у передпліччя ворога.',
	'[ПЕРСОНАЖ №1] поперхнувся, і за це [ПЕРСОНАЖ №2] з переляку приклав прямий удар коліном у лоб ворога.',
	'[ПЕРСОНАЖ №1] забувся, але [ПЕРСОНАЖ №2], прийнявши вольове рішення, вдарив.',
	'[ПЕРСОНАЖ №1] прийшов до тями, але [ПЕРСОНАЖ №2] випадково завдав потужного удару.',
	'[ПЕРСОНАЖ №1] поперхнувся, але [ПЕРСОНАЖ №2] розтрощив кулаком супротивника.',
	'[ПЕРСОНАЖ №1] здивувався, а [ПЕРСОНАЖ №2] вліпив підлий удар.',
	'[ПЕРСОНАЖ №1] висморкався, але [ПЕРСОНАЖ №2] провів удар, що дробить.',
	'[ПЕРСОНАЖ №1] похитнувся, і [ПЕРСОНАЖ №2] вдарив у ногу супротивника',
	'[ПЕРСОНАЖ №1] засмутився, як [ПЕРСОНАЖ №2] вдарив стопою в живіт.',
	'[ПЕРСОНАЖ №1] намагався щось сказати, але [ПЕРСОНАЖ №2] розбив брову супернику.'
];

function attackBothEnemies() {
    const damageToEnemy = Math.floor(Math.random() * 20) + 5;
    const damageToMewtwo = Math.floor(Math.random() * 20) + 5;

    enemy.health -= damageToEnemy;
    enemy.updateHealth();
    logAction('Charmander', damageToEnemy, enemy.health);
    checkVictory(enemy.health, 'Ви перемогли Charmander!');

    mewtwo.health -= damageToMewtwo;
    mewtwo.updateHealth();
    logAction('Mewtwo', damageToMewtwo, mewtwo.health);
    checkVictory(mewtwo.health, 'Ви перемогли Mewtwo!');
}

function randomAttack() {
    const damage = Math.floor(Math.random() * 15) + 5;
    const target = Math.random() < 0.5 ? enemy : mewtwo;

    target.health -= damage;
    target.updateHealth();
    logAction(target === enemy ? 'Charmander' : 'Mewtwo', damage, target.health);
    checkVictory(target.health, `Ви перемогли ${target === enemy ? 'Charmander' : 'Mewtwo'}!`);
}

function logAction(target, damage, remainingHealth) {
    const logText = `${target} отримав ${damage} шкоди, залишилось ${remainingHealth} HP.`;
    const randomLog = logs[Math.floor(Math.random() * logs.length)];
    const formattedLog = randomLog.replace('[ПЕРСОНАЖ №1]', 'Гравець').replace('[ПЕРСОНАЖ №2]', target);
    
    const newLogEntry = `<p>${formattedLog} (${logText})</p>`;
    logContainer.innerHTML = newLogEntry + logContainer.innerHTML;
}

function checkVictory(health, message) {
    if (health <= 0) {
        alert(message);
        resetGame();
    }
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
    }, 2000);
}

btnKick.addEventListener('click', function() {
    attackBothEnemies();
});

btnRandomAttack.addEventListener('click', function() {
    randomAttack();
});
