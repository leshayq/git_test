export class Pokemon {
    constructor(name, hp, progressBar, healthText) {
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.progressBar = progressBar;
        this.healthText = healthText;
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
        this.updateHealthUI();
        return this.hp === 0;
    }

    updateHealthUI() {
        const healthPercent = (this.hp / this.maxHp) * 100;
        this.progressBar.style.width = `${healthPercent}%`;
        this.healthText.textContent = `${this.hp} / ${this.maxHp}`;
    }
}