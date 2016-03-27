import Ship from './componants/Ship';

class ShipPool {

  constructor(game, quantity, colour, group) {
    this._ships = [];
    this._game = game;
    this._group = group;
    this.colour = colour;
    this.shipEmitter = this._createEmitter(colour);
    for (let i = 0; i < quantity; i++) {
      this._ships.push(new Ship(game, colour, this.shipEmitter, group));
    }
  }

  _createEmitter(shipColour) {
    const colours = [];
    const shipData = [];
    const particleTextures = [];
    const blueShipEmitter = this._game.make.bitmapData(40, 40);
    const ship = this._game.make.image(0, 0, 'game', `${shipColour}Ship`);
    blueShipEmitter.copy(ship).update();
    blueShipEmitter.processPixelRGB((color, x, y) => {
      if (!(x % 3) && !(y % 3)) {
        if (color.a > 0) {
          let idx = colours.indexOf(color.rgba);
          if (idx === -1) {
            idx = colours.push(color.rgba) - 1;
          }

          //  Store the coordinates and color
          shipData.push({ x, y, colour: idx });
        }
      }

      return false;
    });

    colours.forEach(colour => {
      const bmd = this._game.make.bitmapData(2, 2);
      const size = this._game.rnd.between(1, 2);
      bmd.rect(0, 0, size, size, colour);
      bmd.update();
      particleTextures.push(bmd);
    });

    const emitter = this._game.add.emitter(0, 0, shipData.length * 6);
    emitter.makeParticles('__default', null, shipData.length * 6);
    emitter.gravity = 0;
    emitter.setXSpeed(-20, 20);
    emitter.setYSpeed(-20, 20);
    emitter.setAlpha(1, 0.6, 1000);
    emitter.setRotation();
    emitter.lifespan = 1000;
    emitter.particleAnchor.set(0);
    emitter.shipData = shipData;
    emitter.shipColours = colours;
    emitter.shipParticleTextures = particleTextures;

    shipData.forEach(data => {
      emitter.emitParticle(-100, -100, particleTextures[data.colour]);
    });

    return emitter;
  }

  takeShip() {
    if (this._ships.length > 0) {
      return this._ships.pop();
    }

    return new Ship(this._game, this.colour, this.shipEmitter, this._group);
  }

  returnShip(ship) {
    ship.reset();
    this._ships.push(ship);
  }

  newGame(game, group) {
    this.shipEmitter.game = game;
    this._ships.forEach(ship => {
      ship.game = game;
      group.addChild(ship);
    });
  }

  resetAll() {
    this._ships.forEach(ship => ship.reset());
  }

}

export default ShipPool;
