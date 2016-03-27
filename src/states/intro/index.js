import I18n from 'i18n-js';

class IntroState extends Phaser.State {

  preload() {
    this.load.audiosprite('audiosprite', './sounds/sprite.mp3', './sounds/sprite.json');
  }

  create() {
    const { sound, world: { centerX, centerY } } = this.game;
    sound.mute = true;
    const audioSprite = this.game.cache.getSound('audiosprite');
    const timer = this.time.create();
    let soundLoaded = false;

    // onDecoded event is not working for audiosprite
    const interval = setInterval(() => {
      if (!audioSprite.isDecoding) {
        clearInterval(interval);
        sound.audiosprite = this.add.audioSprite('audiosprite');
        sound.audiosprite.play('background', 1);
        soundLoaded = true;
        if (!timer.running) {
          this.state.start('Menu');
        }
      }
    }, 100);

    timer.add(3000, () => {
      timer.stop();
      if (soundLoaded) {
        this.state.start('Menu');
      }
    });
    timer.start();

    const welcomeText = this.add.text(centerX, centerY, I18n.t('intro.welcome'), {
      font: '20px orbitronbold',
      fill: '#FFFFFF',
      align: 'center',
    });
    welcomeText.anchor.set(0.5);
  }

}

export default IntroState;
