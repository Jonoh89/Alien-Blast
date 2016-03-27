import { expect } from 'chai';
import Score from '../../../src/states/game/Score';

const shipColours = ['blue', 'brown', 'pink', 'yellow'];

describe('Score class', function () {
  beforeEach(function () {
    this.score = new Score();
  });

  describe('shipDestroyed', function () {
    it('should add 10 for a blue ship', function () {
      this.score.shipDestroyed('blue');
      expect(this.score.total).to.eql(10);
    });

    it('should add 20 for a brown ship', function () {
      this.score.shipDestroyed('brown');
      expect(this.score.total).to.eql(20);
    });

    it('should add 100 for a pink ship', function () {
      this.score.shipDestroyed('pink');
      expect(this.score.total).to.eql(100);
    });

    it('should add 200 for a yellow ship', function () {
      this.score.shipDestroyed('yellow');
      expect(this.score.total).to.eql(200);
    });
  });

  describe('total', function () {
    it('should start at 0', function () {
      expect(this.score.total).to.eql(0);
    });

    it('shoud total up many ships', function () {
      shipColours.forEach(colour => this.score.shipDestroyed(colour));
      expect(this.score.total).to.eql(330);
    });
  });

  describe('shipsDestroyed', function () {
    it('should start all ships at 0', function () {
      expect(Object.values(this.score.shipsDestroyed)).to.eql([0, 0, 0, 0]);
    });

    it('should count the destroyed ships', function () {
      for (let i = 0; i < 100; i++) {
        shipColours.forEach(colour => this.score.shipDestroyed(colour));
      }
      expect(Object.values(this.score.shipsDestroyed)).to.eql([100, 100, 100, 100]);
    });
  });
});
