import I18n from 'i18n-js';
import SummaryButton from './SummaryButton';

const t = (translation, options) => I18n.t(`game.${translation}`, options);

class Summary extends Phaser.Sprite {

  constructor(game, score, shipsDestroyed) {
    const { world: { centerX, centerY, width, height } } = game;
    const buttonGraphic = new Phaser.Graphics(game, centerX, centerY);
    buttonGraphic.lineStyle(2, 0xffffff, 1);
    buttonGraphic.beginFill(0x42A5F5, 0.8);
    buttonGraphic.drawRoundedRect(centerX, centerY, width - 50, height - 50, 10);
    buttonGraphic.endFill();
    const backgroundTexture = buttonGraphic.generateTexture();
    super(game, centerX, centerY, backgroundTexture);
    this.anchor.set(0.5);

    const style = size => ({ font: `${size}px orbitronbold`, fill: '#FFFFFF' });
    const firstPosition = -(this.height / 2) + 50;
    const scoreItnl = gameScore => t('score', { score: gameScore });
    const scoreText = new Phaser.Text(this.game, 0, firstPosition, scoreItnl(score), style(30));
    scoreText.anchor.set(0.5, 1);
    this.addChild(scoreText);

    const summaryText = new Phaser.Text(
      this.game, 0, scoreText.y + 40, t('summary'), style(20)
    );
    summaryText.anchor.set(0.5, 1);
    this.addChild(summaryText);

    const ships = Object.keys(shipsDestroyed).length;
    const quarterWidth = this.width / ships;
    let nextX = -(this.width / 2) - (quarterWidth / 2);
    const nextY = summaryText.y + 40;
    Object.entries(shipsDestroyed).forEach(([colour, amount]) => {
      nextX += quarterWidth;
      const shipText = new Phaser.Text(this.game, nextX, nextY, t(colour), style(20));
      const amountText = new Phaser.Text(this.game, nextX, nextY + 26, amount, style(20));
      [shipText, amountText].forEach(text => {
        text.anchor.set(0.5, 1);
        this.addChild(text);
      });
    });

    const buttonsY = (this.height / 2) - 50;
    const onMenuButton = () => this.game.state.start('Menu');
    new SummaryButton(
      this.game, this, -(quarterWidth), buttonsY, 200, 40, 0x000000, t('backToMenu'), onMenuButton
    );

    const onPlayAgain = () => this.game.state.restart();
    new SummaryButton(
      this.game, this, quarterWidth, buttonsY, 200, 40, 0x000000, t('playAgain'), onPlayAgain
    );

    this.game.world.add(this);
  }

}

export default Summary;
