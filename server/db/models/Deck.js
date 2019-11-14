const Sequelize = require('sequelize')
const db = require('../db')
//const {Card} = require('../db/models')

const Deck = db.define('deck', {
  nextCardPos: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cards: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

module.exports = Deck

/*Deck.prototype.afterCreate = async () => {
   for (let i = 0; i < 81; i++)
   cards.push({
   value: [i % 3],
   type: Math.floor(i / 3) % 3,
   fill: Math.floor(i / 9) % 3,
   color: Math.floor(i / 27),
   isFaceUp: false
   })
   // make 81 cards, put them in the cards column
   }*/

/*Deck.shuffle = (deck) => {
   const { cards } = deck;
   return () => {
   for (let i = 0; i < cards.length; i++) {
   let swapPos = Math.floor(Math.random() * 81);
   let temp = cards[i];
   cards[i] = cards[swapPos];
   cards[swapPos] = temp;
   }
   }
   }

   Deck.prototype.cardsLeft = () => {
   return this.cards.length - this.nextCardPos;
   }

   Deck.prototype.dealOne = () => {
   if (this.nextCardPos >= 0 && this.nextCardPos < this.cards.length) {
   let toDeal = this.cards[this.nextCardPos];
   toDeal.setFaceUp(true);
   this.nextCardPos++;
   return toDeal;
   }
   return "No cards left!";
   }

   Deck.prototype.getNextCardPos = () => {
   return this.nextCardPos;
   }

   Deck.prototype.setNextCardPos = (theNextPos) => {
   this.nextCardPos = theNextPos;
   }*/
