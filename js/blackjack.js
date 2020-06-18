//GAME IS WORKING AND CREATED WITH THE HELP OF STACK OVERFLOW,TUTORIALS,W3C

//BLACKJACK
var BlackjackJS = (function() {

	
	function Card(rank, suit){
		this.rank = rank;
	  this.suit = suit;
	}


		/*THIS FUNCTION GETS VALUE OF CARD*/ 

	Card.prototype.getValue = function(currentTotal){
		var value = 0;

		if (this.rank == 'A' && currentTotal < 11){
				value = 11;
		} else if (this.rank == 'A'){
				value = 1;
		} else if (this.rank == 'J' || this.rank == 'Q' || this.rank == 'K'){
				value = 10;
		} else {
				value = parseInt(this.rank);
		}
		return value;
	}

	//CARD INITIALIZE
	Card.prototype.view = function(){
		var htmlEntities = {
			'hearts' : '&#9829;',
			'diamonds' : '&#9830;',
			'clubs' : '&#9827;',
			'spades' : '&#9824;'
		}
		return `
			<div class="card ` + this.suit + `">
				<div class="top rank">` + this.rank + `</div>
				<div class="suit">` + htmlEntities[this.suit] + `</div>
				<div class="bottom rank">` + this.rank + `</div>
			</div>
		`;
	}

	
		
	

	
	function Player(element, hand){
		this.hand = hand;
		this.element = element;
	}

	/*NEW CARD FROM THE DECK*/
	Player.prototype.hit = function(card){
		this.hand.push(card);
	}

	/*RETURN TOTAL POINTS*/

	Player.prototype.getScore = function(){
		var points = 0;
		for(var i = 0; i < this.hand.length; i++){
			if(i == 0) points = this.hand[i].getValue(0);
			else points += this.hand[i].getValue(points);
		}
		return points;
	}

	/*
		ARRAY OF CARDS GET RETURNED
	*/
	Player.prototype.showHand = function(){
		var hand = "";
		for(var i = 0; i < this.hand.length; i++){
			 hand += this.hand[i].view();
		}
		return hand;
	}

	//RANKS AND SUTS FOR DECKS
	var Deck = new function(){
		this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		this.suits = ['hearts', 'spades', 'diamonds','clubs'];
	  this.deck;

		
		this.init = function(){
			this.deck = []; //empty the array
			for(var s = 3; s >= 0; s--){
		  	for(var r = 12; r >= 0; r--){
		    	this.deck.push(new Card(this.ranks[r], this.suits[s]));
		    }
		  }
		}

		/*
		SHUFFLE FUNCTION IS USED TO SHUFFLE CARDS RANDOMLY IN A DECK
		*/
		this.shuffle = function(){
			 var j, x, i;
			 for (i = this.deck.length; i; i--) {
					 j = Math.floor(Math.random() * i);
					 x = this.deck[i - 1];
					 this.deck[i - 1] = this.deck[j];
					 this.deck[j] = x;
			 }
		}

	}



	
	 /* DEAL BUTTON STATUS WHEN GAME STARTS*/
	

	var Game = new function(){
		this.dealButtonHandler = function(){
			Game.start();
			this.dealButton.disabled = true;
			this.hitButton.disabled = false;
			this.standButton.disabled = false;
		}

		/*HIT BUTTON HANDLER*/
		this.hitButtonHandler = function(){
			
			var card = Deck.deck.pop();
			this.player.hit(card);

			//FOR CARD AND SCORE
			document.getElementById(this.player.element).innerHTML += card.view();
			this.playerScore.innerHTML = this.player.getScore();

			//IF IT GOES ABOVE 21 ,PLAYER LOSES
			if(this.player.getScore() > 21){
				this.gameEnded('You lost!');
			}
		}
		/*THIS IS FOR INITIALIZING*/
		this.init = function(){
			this.dealerScore = document.getElementById('dealer-score').getElementsByTagName("span")[0];
			this.playerScore = document.getElementById('player-score').getElementsByTagName("span")[0];
			this.dealButton = document.getElementById('deal');
			this.hitButton = document.getElementById('hit');
			this.standButton = document.getElementById('stand');

			//JOINING EVENT HANDLER
			this.dealButton.addEventListener('click', this.dealButtonHandler.bind(this));
			this.hitButton.addEventListener('click', this.hitButtonHandler.bind(this));
			this.standButton.addEventListener('click', this.standButtonHandler.bind(this));

		}

		/*
			STAND BUTTON STATUS
		*/
		this.standButtonHandler = function(){
			this.hitButton.disabled = true;
			this.standButton.disabled = true;

			//DEALS CARD WITH USER until
			//one of the conditions below is true
			while(true){
				var card = Deck.deck.pop();

				this.dealer.hit(card);
				document.getElementById(this.dealer.element).innerHTML += card.view();
				this.dealerScore.innerHTML = this.dealer.getScore();

				var playerBlackjack = this.player.getScore() == 21,
						dealerBlackjack = this.dealer.getScore() == 21;

				//LOOP FOR PLAYER STATUS
				if(dealerBlackjack && !playerBlackjack) {
						this.gameEnded('You lost!');
						break;
				} else if(dealerBlackjack && playerBlackjack) {
						this.gameEnded('Draw!');
						break;
				} else if(this.dealer.getScore() > 21 && this.player.getScore() <= 21) {
						this.gameEnded('You won!');
						break;
				} else if(this.dealer.getScore() > this.player.getScore() && this.dealer.getScore() <= 21 && this.player.getScore() < 21) {
						this.gameEnded('You lost!');
						break;
				}
			

			}
		}
		

		/*STARTS THE GAME*/
		this.start = function(){

			//SHUFFLE CARDS
			Deck.init();
			Deck.shuffle();

			//deal one card to dealer
			this.dealer = new Player('dealer', [Deck.deck.pop()]);

			//deal two cards to player
			this.player = new Player('player', [Deck.deck.pop(), Deck.deck.pop()]);

			//render the cards
			document.getElementById(this.dealer.element).innerHTML = this.dealer.showHand();
			document.getElementById(this.player.element).innerHTML = this.player.showHand();

			//PROVIDE the CURRENT SCORES
			this.dealerScore.innerHTML = this.dealer.getScore();
			this.playerScore.innerHTML = this.player.getScore();

			this.setMessage("Hit or Stand");
		}

		/*
			IF WE WIN OR LOOSE
		*/
		this.gameEnded = function(str){
			this.setMessage(str);
			this.dealButton.disabled = false;
			this.hitButton.disabled = true;
			this.standButton.disabled = true;

		}

		/*STATUS OF GAME*/
		this.setMessage = function(str){
			document.getElementById('status').innerHTML = str;
		}


	}

	// GAME INIT FUNCTION
	return {
		init: Game.init.bind(Game)
	}

})() 
