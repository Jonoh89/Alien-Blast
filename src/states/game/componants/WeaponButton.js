class WeaponButton extends Phaser.Sprite {

  constructor(game, x, y, colour) {
    const buttonGraphic = new Phaser.Graphics(game, x, y);
    buttonGraphic.lineStyle(2, 0xffffff, 1);
    buttonGraphic.beginFill(colour, 0.4);
    buttonGraphic.drawCircle(x, y, 50);
    buttonGraphic.endFill();
    const buttonTexture = buttonGraphic.generateTexture();
    super(game, x, y, buttonTexture);
    this.hitArea = new Phaser.Circle(this.width / 2, this.height / 2, 50);
    this.inputEnabled = true;
    this.events.onInputDown.add(() => {});
    this.game.world.addChild(this);
  }

}

export default WeaponButton;
