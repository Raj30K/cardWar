'use strict';

require('../model/cardsmodel');
require('../view/scoretext');
require('../view/closedcard');
require('../view/opencard');
require('../view/playButton');
require('../view/counter');

function Play() {
}

Play.prototype = {
    create: function () {
        this.cardsModel = new CardsModel();
        this.addUI();
        this.addListeners();
        this.nextCard();
    },

    update: function () {

    },

    distributeCards: function () {
        this.counter = new Counter(this.game, 400, 50);
        this.playCounter = new ScoreText(this.game, 390, 50, this.cardsModel.getTotalPlayCounts());
        this.playerOneClosedCard = new ClosedCard(this.game, 200, 250);
        this.playerTwoClosedCard = new ClosedCard(this.game, 600, 250);
        this.game.add.image(178, 92, 'assets', 'stackMark');
        this.game.add.image(578, 92, 'assets', 'stackMark');
        this.playerOneCardLeft = new ScoreText(this.game, 190, 100, this.cardsModel.intialCard());
        this.playerTwoCardLeft = new ScoreText(this.game, 590, 100, this.cardsModel.intialCard());
        this.playButton = new PlayButton(this.game, 400, 400);
    },

    addUI: function () {
        //repeating background
        this.game.add.tileSprite(0, 0, 800, 600, 'assets', 'table');

        //sounds
        this.ambient = this.game.add.audio('ambient');
        this.tap = this.game.add.audio('tap');

        //closed card
        this.distributeCards();
        this.playAmbientSound();
    },

    playAmbientSound: function () {
        this.ambient.loop = true;
        this.ambient.play();
    },

    addListeners: function () {
        this.playButton.events.onInputDown.add(this.playButtonListener, this);
        this.playButton.enable();
    },

    nextCard: function () {

        //update fund info
        this.playerOneCardLeft.setText(this.cardsModel.playerOneCardLeft());
        this.playerTwoCardLeft.setText(this.cardsModel.playerTwoCardLeft());

        //hide closed card if none left
        if (this.cardsModel.cardsLeft() == 0)
            this.closedCard.kill();

        //enable clicks for current card
        this.playButton.enable();

    },

    playButtonListener: function (playBtn) {
        //play sound
        this.cardsModel.setTotalPlayCounts();
        this.playCounter.setText(this.cardsModel.getTotalPlayCounts());
        this.tap.play();
        this.showCards();
        //disable clicks until next card
        this.playButton.disable();
    },

    showCards: function () {
        this.playerOneCardShown = new OpenCard(this.game, 100, 150, this.cardsModel.playerOnePopCard());
        this.playerTwoCardShown = new OpenCard(this.game, 500, 150, this.cardsModel.playerTwoPopCard());
        this.checkResult();
        //setTimeout(this.animateCards,2000, this);
    },

    pushCardToWinningStack: function () {
        this.cardsModel.pushCardToWinningPlayerStack(this.playerOneCardShown.cardSymbol, this.playerOneCardShown.cardValue);
        this.cardsModel.pushCardToWinningPlayerStack(this.playerTwoCardShown.cardSymbol, this.playerTwoCardShown.cardValue);
    },

    checkResult: function () {
        var cardOneIndex = this.cardsModel.checkCardRanking(this.playerOneCardShown.cardValue);
        var cardTwoIndex = this.cardsModel.checkCardRanking(this.playerTwoCardShown.cardValue);

        if (cardOneIndex > cardTwoIndex) {
            this.cardsModel.setWinningPlayer(true);
        } else if (cardOneIndex < cardTwoIndex) {
            this.cardsModel.setWinningPlayer(false);
        } else {
            var randomSelection = Math.floor(Math.random() * 100) + 1;
            var val = randomSelection % 2;
            if (randomSelection % 2) {
                this.cardsModel.setWinningPlayer(false);
            } else {
                this.cardsModel.setWinningPlayer(true);
            }
        }
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.animateCards, this).autoDestroy = true;

        //proceed playing
        if (this.cardsModel.cardsLeft() > 0)
            this.nextCard();
        else
            setTimeout(this.endGame, 1000, this);
    },

    animateCards: function(){
        this.pushCardToWinningStack();
        var xPos = 0;
        var yPos = 150;
        if(this.cardsModel.getWinningPlayer()){
            xPos = -200;
        } else {
            xPos = 900;
        }

        var tweenCardOne = this.game.add
                      .tween(this.playerOneCardShown)
                      .to( { x:xPos, y:yPos}, 400, Phaser.Easing.Quadratic.Out, true);
        var tweenCardTwo = this.game.add
            .tween(this.playerTwoCardShown)
            .to( { x:xPos, y:yPos}, 400, Phaser.Easing.Quadratic.Out, true);

        tweenCardTwo.onComplete.addOnce(this.nextCard, this);
    },

    endGame: function (scope) {
        scope.game.state.start('gameover', false, false, 0);
    }
};

module.exports = Play;
