import isOverWrapper from '../../../helpers/button/isOverWrapper';

class MenuButton extends Phaser.Button {

  constructor(game, x, y, width, height, text, callback) {
    const buttonGraphic = new Phaser.Graphics(game, x, y);
    buttonGraphic.lineStyle(2, 0xffffff, 1);
    buttonGraphic.beginFill(0x42A5F5, 0.4);
    buttonGraphic.drawRoundedRect(x, y, width, height, 10);
    buttonGraphic.endFill();
    const buttonTexture = buttonGraphic.generateTexture();

    super(game, x, y, buttonTexture, isOverWrapper(callback));
    this.anchor.set(0.5);

    const buttonText = new Phaser.Text(this.game, 0, 2, text, {
      font: '20px orbitronbold',
      fill: '#FFFFFF',
    });
    buttonText.anchor.set(0.5);
    this._buttonText = this.addChild(buttonText);

    this.game.world.addChild(this);
    this.events.onInputDown.add(this._onInputDown, this);
    this.events.onInputOut.add(this._onInputOut, this);
  }

  get text() {
    return this._buttonText;
  }

  _onInputDown() {
    this.scale.set(1.1);
  }

  _onInputOut() {
    this.scale.set(1);
  }

}

export default MenuButton;
