const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

class Ship extends Phaser.Sprite {

  constructor(game, colour, emitter, group) {
    super(game, -40, -40, 'game', `${colour}Ship`);
    this.colour = colour;
    this.anchor.set(0.5);
    this.emitter = emitter;
    this.inputEnabled = true;
    group.addChild(this);
  }

  _setStartingAttackPosition() {
    const { rnd, width, height } = this.game;
    switch (rnd.between(0, 3)) {
      case TOP:
        this.position.set(rnd.between(0, width), -40);
        break;
      case RIGHT:
        this.position.set(width + 40, rnd.between(0, height));
        break;
      case BOTTOM:
        this.position.set(rnd.between(0, width), height + 40);
        break;
      case LEFT:
        this.position.set(-40, rnd.between(0, height));
        break;
      // no default
    }
  }

  attack({ onComplete, onInputDown }) {
    const { centerX, centerY } = this.game.world;
    this._setStartingAttackPosition();

    const angle = Phaser.Math.angleBetweenPoints(new Phaser.Point(centerX, centerY), this.position);
    const x = centerX + 50 * Math.cos(angle);
    const y = centerY + 50 * Math.sin(angle);

    const attack = this.game.add.tween(this).to({ x, y }, 2000, Phaser.Easing.Quadratic.InOut);
    const invade = this.game.add.tween(this).to({ x: centerX, y: centerY }, 2000);
    attack.chain(invade);
    invade.onUpdateCallback(() => {
      const distanceToGo = Phaser.Math.distance(this.x, this.y, centerX, centerY);
      const scale = (distanceToGo / 50) > 1 ? 1 : distanceToGo / 50;
      this.scale.setTo(scale);
    }, this);
    invade.onComplete.add(onComplete);
    this.events.onInputDown.add(() => {
      invade.stop(false);
      attack.stop(false);
      onInputDown();
    });
    attack.start();
  }

  explode() {
    const shipX = this.x - (this.width / 2);
    const shipY = this.y - (this.height / 2);
    const { shipData, shipParticleTextures } = this.emitter;
    shipData.forEach(data => {
      this.emitter.emitParticle(
        shipX + (data.x * this.scale.x),
        shipY + (data.y * this.scale.y),
        shipParticleTextures[data.colour]
      );
    });
  }

  reset() {
    this.position.set(-40, -40);
    this.scale.set(1);
    this.events.onInputDown.removeAll();
  }

}

export default Ship;
