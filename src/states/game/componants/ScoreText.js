import I18n from 'i18n-js';

const scoreText = score => I18n.t('game.score', { score });

class ScoreText extends Phaser.Text {

  constructor(game, x, y) {
    super(game, x, y, scoreText(0), { font: '20px orbitronbold', fill: 'white' });
    this.game.world.addChild(this);
  }

  updateScore(score) {
    this.setText(scoreText(score));
  }

}

export default ScoreText;
