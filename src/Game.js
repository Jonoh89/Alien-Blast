import IntroState from './states/intro';
import MenuState from './states/menu';
import GameState from './states/game';
import throttle from 'lodash.throttle';

class Game extends Phaser.Game {

  constructor() {
    super(640, 361, Phaser.AUTO, 'game', null, true, true);
    this.state.add('Intro', IntroState, false);
    this.state.add('Menu', MenuState, false);
    this.state.add('Game', GameState, false);

    window.addEventListener('resize', throttle(this._resize.bind(this), 100));
  }

  boot() {
    super.boot();
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    if (this.device.desktop === false) {
      if (screen && screen.orientation && screen.orientation) {
        screen.orientation.lock('landscape');
      }

      this.scale.forceOrientation(true);
      this.scale.enterIncorrectOrientation.add(this._enterIncorrectOrientation, this);
      this.scale.leaveIncorrectOrientation.add(this._leaveIncorrectOrientation, this);
    }
  }

  _enterIncorrectOrientation() {
    this.paused = true;
    const element = document.getElementById('rotate');
    element.style.display = 'block';
    element.style.height = `${window.innerHeight}px`;
    element.style.width = `${window.innerWidth}px`;
  }

  _leaveIncorrectOrientation() {
    this.paused = false;
    document.getElementById('rotate').style.display = 'none';
  }

  _resize() {
    const element = document.getElementById('slide-up');
    if (window.innerHeight === document.documentElement.clientHeight) {
      this.paused = false;
      element.style.display = 'none';
    } else {
      this.paused = true;
      element.style.display = 'block';
      element.style.height = `${window.innerHeight + 1000}px`;
      element.style.width = `${window.innerWidth}px`;
    }
  }

}

export default Game;
