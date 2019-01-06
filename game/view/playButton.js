
require('../view/scoretext');

PlayButton = function (game, x, y) {

	Phaser.Sprite.call(this, game, x, y, 'assets', 'openCard');    
	
	this.scale = new Phaser.Point(.75, .25);
    this.anchor.setTo(0.5, 0.5);    
   
    game.add.existing(this);
    this.playButtonText = new ScoreText(game, x - 30, y - 10 , "SHOW");

    this.enable = function(){

		this.inputEnabled = true;
		this.alpha = 1;
		this.tween = this.game.add.tween(this).to({alpha:.5},1000,Phaser.Easing.Linear.None,true,0,-1,true);
	};

	this.disable= function(){
		
		if (this.tween)
			this.tween.stop();
		
		this.alpha = .5;
		this.inputEnabled = false;
	};

	this.disable();
};

PlayButton.prototype = Object.create(Phaser.Sprite.prototype);
PlayButton.prototype.constructor = PlayButton;
