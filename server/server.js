
Meteor.publish('players', function() {
  return Players.find();
});
Meteor.publish('games', function() {
  return Games.find();
});

// act when a game starts
Games.find({}).observe({
  changed: function(newGame, oldGame) {
    if (newGame.status === 'starting') {
      console.log('New game starting!', newGame._id);
      // TODO
      // pick up random player order
      console.log('User', newGame.players[0].username, ' will start!');

    }
  }
})
