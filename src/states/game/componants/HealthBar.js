class HealthBar extends Phaser.Group {

  constructor(game, x, y, lives = 3) {
    super(game);
    this.livesLeft = lives;
    this.hearts = [];
    for (let i = 0; i < lives; i++) {
      this.hearts.push(new Phaser.Sprite(this.game, x + i * -40, y, 'game', 'heart'));
    }
    this.hearts.forEach(h => h.anchor.setTo(0.5));
    this.addMultiple(this.hearts);
    this.game.world.addChild(this);
  }

  loseLife() {
    this.livesLeft--;
    if (this.children[this.livesLeft]) {
      const heart = this.children[this.livesLeft];
      this.game.add.tween(heart.scale).to({ x: 0, y: 0 }, 1000, null, true);
    }

    return this.livesLeft;
  }

}

export default HealthBar;
