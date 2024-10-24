export class Pokemon {
    constructor(name, health, progressbar, healthText) {
        this.name = name;
        this.health = health;
        this.progressbar = progressbar;
        this.healthText = healthText;
        this.updateHealth();
    }

    updateHealth() {
        const healthPercentage = (this.health / 100) * 100;
        this.progressbar.style.width = `${healthPercentage}%`;

        this.progressbar.classList.remove('low', 'critical');

        if (healthPercentage < 20) {
            this.progressbar.classList.add('critical'); 
        } else if (healthPercentage < 60) {
            this.progressbar.classList.add('low'); 
        }

        this.healthText.textContent = `${this.health} / 100`;
    }

    takeDamage(damage) {
        this.health -= damage;
        this.updateHealth();
        return this.health <= 0;
    }
}
