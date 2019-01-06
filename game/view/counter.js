
require('../view/scoretext');

Counter = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'assets', 'openCard');

    this.scale = new Phaser.Point(.75, .25);
    this.anchor.setTo(0.5, 0.5);

    game.add.existing(this);
    this.playButtonText = new ScoreText(game, x - 35, y - 25 , "Counter");

};

Counter.prototype = Object.create(Phaser.Sprite.prototype);
Counter.prototype.constructor = Counter;
