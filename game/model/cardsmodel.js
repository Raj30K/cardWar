CardsModel = function () {

    var symbols = ["clubs", "hearts", "spades", "diamonds"];
    var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    var cardStack = [];
    var openCard = null;
    var initialCardEachPlayer = 26;
    var gameInitialized = true;
    var playerOneCards = [];
    var playerTwoCards = [];
    var playerOneWin = false;
    var playCount = 0;

    this.prepareDeck = function(){

        symbols.forEach( function(symbol){
            values.forEach(function(value){
              cardStack.push({symbol:symbol, value:value});
          });
      });

      cardStack = Phaser.ArrayUtils.shuffle(cardStack);
      this.distributeShuffledCards();
    };

    this.distributeShuffledCards = function () {
        cardStack.forEach(function(card, index){
            if(index % 2){
                playerOneCards.push(card);
            } else {
                playerTwoCards.push(card);
            }
        });
    };

    this.intialCard = function(){
      return initialCardEachPlayer;
    };

    this.isGameInitilized = function(){
      return gameInitialized;
    };

    this.isGameInProgress = function(value){
      gameInitialized = value;
    };

    this.playerOneCardLeft = function () {
        return playerOneCards.length;
    };

    this.playerTwoCardLeft = function () {
        return playerTwoCards.length;
    };

    this.playerOnePopCard = function(){
    	return playerOneCards.shift();
    };

    this.playerTwoPopCard = function(){
        return playerTwoCards.shift();
    };

    this.pushCardToWinningPlayerStack = function(symbol, value){
        if(playerOneWin){
            playerOneCards.push({symbol, value});
        }else {
            playerTwoCards.push({symbol, value});
        }
    };

    this.checkCardRanking = function (cardValue) {
       return values.indexOf(cardValue);
    };

    this.setWinningPlayer = function (value) {
        playerOneWin = value;
    };

    this.getWinningPlayer = function () {
      return playerOneWin;
    };

    this.cardsLeft = function () {
      return (playerOneCards.length > playerTwoCards.length? playerTwoCards.length : playerOneCards.length)
    };

    this.getTotalPlayCounts = function () {
      return playCount;
    };

    this.setTotalPlayCounts = function () {
         playCount++;
    };

    this.checkWinner = function () {
        if(playerOneCards.length > 0){
            return "Congrats :: Player One Wins!!"
        } else if(playerTwoCards.length > 0) {
            return "Congrats :: Player Two Wins!!"
        }

    };

	this.prepareDeck();
};
