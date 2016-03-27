import I18n from 'i18n-js';
import MenuButton from './components/MenuButton';

class MenuState extends Phaser.State {

  create() {
    const { sound, width, height, camera, world: { centerX } } = this.game;
    const buttons = [];
    const buttonWidth = width - (width / 2);
    const startButton = new MenuButton(this.game, centerX, 0, buttonWidth, 40, I18n.t('menu.start'),
      () => {
        this.game.paused = true;
        const lastState = new Phaser.RenderTexture(this.game, width, height, 'cover');
        lastState.renderXY(this.game.world, -camera.x, -camera.y);
        this.game.state.start('Game', true, false, {
          transition: true,
          lastState,
        });
        this.game.paused = false;
      }
    );

    const soundButton = new MenuButton(
      this.game, centerX, 0, buttonWidth, 40, I18n.t('menu.soundOff'), button => {
        sound.mute = !sound.mute;
        button.text.setText(sound.mute ? I18n.t('menu.soundOff') : I18n.t('menu.soundOn'));
      }
    );

    buttons.push(startButton, soundButton);

    if (this.scale.compatibility.supportsFullScreen) {
      buttons.push(
        new MenuButton(this.game, centerX, 0, buttonWidth, 40, I18n.t('menu.goFullScreen'), () => {
          this.scale.startFullScreen();
        }
      ));
    }

    const padding = 100;
    const verticalSpace = height - padding;
    const evenlySplit = verticalSpace / buttons.length;
    buttons.forEach((button, i) => {
      button.y = (padding / 2) + (evenlySplit / 2) + (evenlySplit * i);
    });
  }

}

export default MenuState;
