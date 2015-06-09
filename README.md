# 5001, the web browser game!

## Game steps

### Use case

Cf. paper version, done in the Excel document. Probably outdated and incomplete. 

Here is an example of a minimalistic full game scenario. We will split the phase in X : 

1. preparation
2. game
3. end

#### Preparation

Player 1 create a game A
Player 2 joins the game A
Player 1 start the game A

#### Game

This use case should cover all the different cases :

Server picks a random players to start.
Player 2 starts 
Player 2 throws the dices
Player 2 looose                     // case 1 : loose
Player 1 turn
Player 1 throws the dices
Player 1 scores 300
Player 1 keep score                 // case 2 : direct score 
Player 2 turn
Player 2 throws the dices
Player 2 score 50 
Player 2 choose to continue
Player 2 throws the remaining dices
Player 2 score 100                  // case 3 : cumulative score
Player 2 choose to continue
Player 2 score 200
Player 2 throw the dices            // special case player is forced to throw all the dices
Player 2 loose
... etc...

#### End

Player 2 score > 5000               // last turn
Player 1 turn
Player 1 loose
Server ends the game


## Logic

1. startGame
    1. John starts!
    2. timer player start
    3. activePLayer -> throwDices
    4. otherPlayers -> wait
2. throwDice
    1. allPlayer -> watchDices
3. score
    1. if dice score
        1. continue
            1. activePlayer -> chooseDices
            2. activePlayer -> throwDices
            3. otherPlayers -> wait
        2. keep score
            1. save score
            2. nextPlayer
4.

## TODO

- How to prevent player from cheating?
- Detect when player close the browser or switch off his smartphone
- Add CSS transitions with https://github.com/groupbuddies/meteor-bender

## Testing

Added Mocha for automated testing. Cf [http://mochajs.org](http://mochajs.org) and [http://chaijs.com/api/assert](http://chaijs.com/api/assert) for more info. 

## Sources

Uses the very nice [dice-js](https://github.com/jhamlet/dice-js) & [teal dice](http://a.teall.info/dice/) & [teal dice src](https://github.com/emanchado/3d-die-roller) lib!
