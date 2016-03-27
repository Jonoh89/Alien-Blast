import HealthBar from './componants/HealthBar';
import ScoreText from './componants/ScoreText';
import Summary from './componants/Summary';
import ShipsPool from './ShipsPool';
import Score from './score';

const shipColours = ['blue', 'brown', 'pink', 'yellow'];

class GameState extends Phaser.State {

  init(options) {
    if (options && options.transition) {
      this._lastStateImage = this.add.image(0, 0, options.lastState);
    }

    this._score = new Score();
    this._spawnTime = 1000;
  }

  preload() {
    this.load.atlasJSONHash('game', './images/game.png', './images/game.json');
  }

  create() {
    if (this._lastStateImage) {
      this.add.tween(this._lastStateImage).to({ alpha: 0 }, 400, null, true);
    }

    const earth = this.add.sprite(this.world.centerX, this.world.centerY, 'game', 'world');
    earth.anchor.setTo(0.5);

    const shipsGroup = this.add.group();
    this._ships = shipColours.map(colour => new ShipsPool(this.game, 20, colour, shipsGroup));

    this._healthBar = new HealthBar(this.game, this.world.width - 30, 24);
    this._scoreText = new ScoreText(this.game, 10, 10);

    this._timer = this.time.create(false);
    this._timer.add(100, this._spawnShip, this);
    this._timer.start();
  }

  _shipDestroyed(ship) {
    ship.explode();
    this._score.shipDestroyed(ship.colour);
    this._scoreText.updateScore(this._score.total);
  }

  _spawnShip() {
    const { sound } = this.game;
    this._spawnTime = this._spawnTime > 200 ? this._spawnTime -= 20 : this._spawnTime--;
    this._timer.add(this._spawnTime, this._spawnShip, this);
    const shipPool = this._ships[this.rnd.between(0, 3)];
    const ship = shipPool.takeShip();
    ship.attack({
      onComplete: () => {
        shipPool.returnShip(ship);
        const livesLeft = this._healthBar.loseLife();
        if (livesLeft === 0) {
          this._summary = new Summary(this.game, this._score.total, this._score.shipsDestroyed);
          this.add.tween(this._summary.scale)
            .to({ x: 1, y: 1 }, 500, Phaser.Easing.Bounce.Out, true, 1000);
        }
      },
      onInputDown: () => {
        sound.audiosprite.play('laser', 1);
        this._shipDestroyed(ship);
        shipPool.returnShip(ship);
      },
    });
  }

  shutdown() {
    this._healthBar.destroy(true);
    this._scoreText.destroy(true);
    this._summary.destroy(true);
  }

}

export default GameState;
