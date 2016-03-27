class Score {

  constructor() {
    this._score = 0;
    this._blueShipsDestroyed = 0;
    this._brownShipsDestroyed = 0;
    this._pinkShipsDestroyed = 0;
    this._yellowShipsDestroyed = 0;
  }

  get total() {
    return this._score;
  }

  get shipsDestroyed() {
    return {
      blue: this._blueShipsDestroyed,
      brown: this._brownShipsDestroyed,
      pink: this._pinkShipsDestroyed,
      yellow: this._yellowShipsDestroyed,
    };
  }

  shipDestroyed(colour) {
    switch (colour) {
      case 'blue':
        this._score += 10;
        this._blueShipsDestroyed++;
        break;
      case 'brown':
        this._score += 20;
        this._brownShipsDestroyed++;
        break;
      case 'pink':
        this._score += 100;
        this._pinkShipsDestroyed++;
        break;
      case 'yellow':
        this._score += 200;
        this._yellowShipsDestroyed++;
        break;
      // no default
    }
  }

}

export default Score;
