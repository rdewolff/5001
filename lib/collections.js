Players = new Meteor.Collection('players');

Games = new Meteor.Collection('games');

Meteor.methods({
  addGame: function(game) {
    return Games.insert(game);
  },
  setGameStatus: function(gameId, status) {
    Games.update(gameId,
      {
        $set: {
          status: status // Example : 'starting'
        }
      });
  },
  addGamePlayer: function(gameId, player) {
    Games.update(gameId,
      {
        $inc: {
          numberOfPlayers: 1
        },
        $push: {
          players : player
        }
      });
  },
  deleteGame: function(gameId) {
    Games.remove({_id: gameId});
  },
  addPlayer: function(player) {
    // we add the ID to the player object
    player._id = Players.insert(player);
    // we return the whole object with it's ID
    return player;
  }
});
