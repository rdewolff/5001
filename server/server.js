
Meteor.publish('players', function() {
  return Players.find();
});
Meteor.publish('games', function() {
  return Games.find();
});
