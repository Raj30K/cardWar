
OpenCard = function (game, x, y, cardData) {

	Phaser.Sprite.call(this, game, x, y, 'assets', 'openCard');    
	
	this.scale = new Phaser.Point(.8, .8);
    this.addChild(new Phaser.Sprite(this.game, 50, 83, 'assets', cardData.symbol + "L"));
    this.addChild(new Phaser.Sprite(this.game, 109, 17, 'assets', cardData.symbol + "S"));
    this.addChild(new Phaser.Text(this.game, 15, 15, cardData.value));
    this.cardSymbol = cardData.symbol;
    this.cardValue = cardData.value;
    var tweenCard = this.game.add
        .tween(this.scale)
        .to( { x: 1, y: 1}, 400, Phaser.Easing.Back.Out, true);

	game.add.existing(this);
};

OpenCard.prototype = Object.create(Phaser.Sprite.prototype);
OpenCard.prototype.constructor = OpenCard;
