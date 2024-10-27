import { pokemons } from './pokemons.js';
import { Pokemon } from './pokemon.js';
import { logAction } from './log.js';

class Game {
    constructor() {
        this.player1 = null;
        this.enemy1 = null;
        this.enemy2 = null;
        this.logContainer = document.getElementById('logs');
        this.$elImgPlayer1 = document.getElementById('img-player1');
        this.$elImgEnemy1 = document.getElementById('img-enemy1');
        this.$elImgEnemy2 = document.getElementById('img-enemy2');
        this.$namePlayer1 = document.getElementById('name-character');
        this.$nameEnemy1 = document.getElementById('name-enemy');
        this.$nameEnemy2 = document.getElementById('name-mewtwo');
        this.$progressbarPlayer1 = document.getElementById('progressbar-character');
        this.$progressbarEnemy1 = document.getElementById('progressbar-enemy');
        this.$progressbarEnemy2 = document.getElementById('progressbar-mewtwo');
        this.$healthPlayer1 = document.getElementById('health-character');
        this.$healthEnemy1 = document.getElementById('health-enemy');
        this.$healthEnemy2 = document.getElementById('health-mewtwo');

        this.maxAttacks = 6;
        this.thunderJoltCount = 0;
        this.thunderBoltCount = 0;
        this.electroBallCount = 0;
        this.voltTackleCount = 0;
        this.thunderCrackCount = 0;

        this.updateAttackButtons();
    }

    getRandomPokemon(exclude = []) {
        const filteredPokemons = pokemons.filter(pokemon => !exclude.includes(pokemon.name));
        return filteredPokemons[Math.floor(Math.random() * filteredPokemons.length)];
    }

    startGame() {
        const playerPokemon = this.getRandomPokemon();
        const enemyPokemon1 = this.getRandomPokemon([playerPokemon.name]);
        const enemyPokemon2 = this.getRandomPokemon([playerPokemon.name, enemyPokemon1.name]);

        this.player1 = new Pokemon(playerPokemon.name, playerPokemon.hp, this.$progressbarPlayer1, this.$healthPlayer1);
        this.enemy1 = new Pokemon(enemyPokemon1.name, enemyPokemon1.hp, this.$progressbarEnemy1, this.$healthEnemy1);
        this.enemy2 = new Pokemon(enemyPokemon2.name, enemyPokemon2.hp, this.$progressbarEnemy2, this.$healthEnemy2);

        this.$elImgPlayer1.src = playerPokemon.img;
        this.$namePlayer1.textContent = playerPokemon.name;
        this.$healthPlayer1.textContent = `${playerPokemon.hp} / ${playerPokemon.hp}`;

        this.$elImgEnemy1.src = enemyPokemon1.img;
        this.$nameEnemy1.textContent = enemyPokemon1.name;
        this.$healthEnemy1.textContent = `${enemyPokemon1.hp} / ${enemyPokemon1.hp}`;

        this.$elImgEnemy2.src = enemyPokemon2.img;
        this.$nameEnemy2.textContent = enemyPokemon2.name;
        this.$healthEnemy2.textContent = `${enemyPokemon2.hp} / ${enemyPokemon2.hp}`;
    }

    updateAttackButtons() {
        const thunderJoltButton = document.getElementById('btn-kick');
        const thunderBoltButton = document.getElementById('btn-random-attack');
        const electroBallButton = document.getElementById('btn-electro-ball');
        const voltTackleButton = document.getElementById('btn-volt-tackle');
        const thunderCrackButton = document.getElementById('btn-thunder-crack');

        thunderJoltButton.textContent = `Thunder Jolt (${this.thunderJoltCount})`;
        thunderBoltButton.textContent = `Thunder Bolt (${this.thunderBoltCount})`;
        electroBallButton.textContent = `Electro Ball (${this.electroBallCount})`;
        voltTackleButton.textContent = `Volt Tackle (${this.voltTackleCount})`;
        thunderCrackButton.textContent = `Thunder Crack (${this.thunderCrackCount})`;

        thunderJoltButton.disabled = this.thunderJoltCount >= this.maxAttacks;
        thunderBoltButton.disabled = this.thunderBoltCount >= this.maxAttacks;
        electroBallButton.disabled = this.electroBallCount >= this.maxAttacks;
        voltTackleButton.disabled = this.voltTackleCount >= this.maxAttacks;
        thunderCrackButton.disabled = this.thunderCrackCount >= this.maxAttacks;
    }

    resetGame() {
        setTimeout(() => {
            this.logContainer.innerHTML = '';
            this.thunderJoltCount = 0;
            this.thunderBoltCount = 0;
            this.electroBallCount = 0;
            this.voltTackleCount = 0;
            this.thunderCrackCount = 0;
            this.updateAttackButtons();
            this.startGame();
            alert('Гра зкинута! Почніть новий бій!');
        }, 500);
    }

    attackEnemy(target, damage) {
        if (target.takeDamage(damage)) {
            alert(`Вы перемогли ${target.name}!`);
            this.replaceDefeatedEnemy(target);
        }
        logAction(this.logContainer, target.name, damage, target.hp);
    }

    replaceDefeatedEnemy(target) {
        const newEnemy = this.getRandomPokemon([this.player1.name, this.enemy1.name === target.name ? this.enemy2.name : this.enemy1.name]);
        const enemyEl = target === this.enemy1 ? this.$elImgEnemy1 : this.$elImgEnemy2;
        const nameEl = target === this.enemy1 ? this.$nameEnemy1 : this.$nameEnemy2;
        const progressBar = target === this.enemy1 ? this.$progressbarEnemy1 : this.$progressbarEnemy2;
        const healthText = target === this.enemy1 ? this.$healthEnemy1 : this.$healthEnemy2;

        const newEnemyInstance = new Pokemon(newEnemy.name, newEnemy.hp, progressBar, healthText);
        if (target === this.enemy1) {
            this.enemy1 = newEnemyInstance;
        } else {
            this.enemy2 = newEnemyInstance;
        }

        enemyEl.src = newEnemy.img;
        nameEl.textContent = newEnemy.name;
        healthText.textContent = `${newEnemy.hp} / ${newEnemy.hp}`;
    }
}

const game = new Game();
game.startGame();

document.getElementById('btn-reset').addEventListener('click', () => {
    game.resetGame();
});

// Атака Thunder Jolt
document.getElementById('btn-kick').addEventListener('click', () => {
    if (game.thunderJoltCount < game.maxAttacks) {
        const damage = 20;
        const randomEnemy = Math.random() < 0.5 ? game.enemy1 : game.enemy2;
        game.attackEnemy(randomEnemy, damage);
        game.thunderJoltCount++;
        game.updateAttackButtons();
        if (game.thunderJoltCount >= game.maxAttacks) {
            console.log(`Thunder Jolt: атак більше немає. Залишилось 0 атак.`);
        } else {
            console.log(`Thunder Jolt: залишилось ${game.maxAttacks - game.thunderJoltCount} атак.`);
        }
    }
});

document.getElementById('btn-random-attack').addEventListener('click', () => {
    if (game.thunderBoltCount < game.maxAttacks) {
        const randomEnemy = Math.random() < 0.5 ? game.enemy1 : game.enemy2;
        const randomDamage = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
        game.attackEnemy(randomEnemy, randomDamage);
        game.thunderBoltCount++;
        game.updateAttackButtons();
        if (game.thunderBoltCount >= game.maxAttacks) {
            console.log(`Thunder Bolt: атак більше немає. Залишилось 0 атак.`);
        } else {
            console.log(`Thunder Bolt: залишилось ${game.maxAttacks - game.thunderBoltCount} атак.`);
        }
    }
});

document.getElementById('btn-electro-ball').addEventListener('click', () => {
    if (game.electroBallCount < game.maxAttacks) {
        const damage = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        game.attackEnemy(game.enemy1, damage);
        game.attackEnemy(game.enemy2, damage);
        game.electroBallCount++;
        game.updateAttackButtons();
        if (game.electroBallCount >= game.maxAttacks) {
            console.log(`Electro Ball: атак більше немає. Залишилось 0 атак.`);
        } else {
            console.log(`Electro Ball: залишилось ${game.maxAttacks - game.electroBallCount} атак.`);
        }
    }
});

document.getElementById('btn-volt-tackle').addEventListener('click', () => {
    if (game.voltTackleCount < game.maxAttacks) {
        const damage = 55;
        game.attackEnemy(game.enemy1, damage);
        game.attackEnemy(game.enemy2, damage);
        game.player1.takeDamage(5);
        game.voltTackleCount++;
        game.updateAttackButtons();
        if (game.voltTackleCount >= game.maxAttacks) {
            console.log(`Volt Tackle: атак більше немає. Залишилось 0 атак.`);
        } else {
            console.log(`Volt Tackle: залишилось ${game.maxAttacks - game.voltTackleCount} атак.`);
        }
    }
});

document.getElementById('btn-thunder-crack').addEventListener('click', () => {
    if (game.thunderCrackCount < game.maxAttacks) {
        const randomEnemy = Math.random() < 0.5 ? game.enemy1 : game.enemy2;
        const randomDamage = Math.floor(Math.random() * (60 - 40 + 1)) + 40;
        game.attackEnemy(randomEnemy, randomDamage);
        game.thunderCrackCount++;
        game.updateAttackButtons();
        if (game.thunderCrackCount >= game.maxAttacks) {
            console.log(`Thunder Crack: атак більше немає. Залишилось 0 атак.`);
        } else {
            console.log(`Thunder Crack: залишилось ${game.maxAttacks - game.thunderCrackCount} атак.`);
        }
    }
});


