# 5001, the web browser game!

## Game steps (state diagram)

Cf. paper version, done in the Excel document.

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


## Sources

Uses the very nice [dice-js](https://github.com/jhamlet/dice-js) & [teal dice](http://a.teall.info/dice/) & [teal dice src](https://github.com/emanchado/3d-die-roller) lib!
