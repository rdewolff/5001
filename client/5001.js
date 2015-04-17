/**
 * Add the JS sources once HTML rendered
 */
Template.main.rendered = function() {

  console.log('rendered!');

  Session.set('page', 'home');

  var scripts = document.getElementById('scripts');
  var script;

  script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = '/js/three.min.js';
  scripts.appendChild(script);

  script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = '/js/cannon.min.js';
  scripts.appendChild(script);

  script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = '/js/teal.js';
  scripts.appendChild(script);

  script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = '/js/dice.js';
  scripts.appendChild(script);

  script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = '/js/main.js';
  scripts.appendChild(script);

  // TODO: clean that up!
  setTimeout(function() {
    dice_initialize(document.body, window.innerWidth - 1, window.innerHeight - 1);
  }, 400);
}

/**
 * Global helpers
 */
Template.registerHelper('getPlayer', function() {
  return Session.get('player');
});
Template.registerHelper('getSessionPage', function() {
  return Session.get('page');
});
Template.registerHelper('getGame', function() {
  return Session.get('game');
});
// test dynamic page change via DB
Template.registerHelper('getGameStatus', function() {
  return Games.findOne(Session.get('game')).status;
})

/**
* Home
*/
Template.home.events({
  'click #login': function() {
    Session.set('page', 'login');
  },
  'click #guest': function() {
    Session.set('page', 'guest');
  },
  'click #rules': function() {
    Session.set('page', 'rules');
  },
});

/**
* Login
*/
Template.login.events({
  'click #home':function() {
    Session.set('page', 'home');
  }
});

/**
* Rules
*/
Template.rules.events({
  'click #home':function() {
    Session.set('page', 'home');
  }
});

/**
* Guest
*/
Template.guest.events({
  'click #submit':function(ev) {

    var name = document.getElementById('name').value;

    // simple validation, more than 3 characters
    if (name.length > 3) {

      var player = {
        username : name,
        guest : true,
        date : +new Date // timestamp
      };

      Meteor.call('addPlayer', player, function(error, player) {
        Session.set('player', player)
        Session.set('page', 'list');
      });

    } else {
      $('#name').parent().addClass('has-error');
    }
  },
  'click #home':function() {
    Session.set('page', 'home');
  }
});

/**
 * List
 */
Template.list.events({
  'click #create':function() {
    Session.set('page', 'create');
  },
  'click #join':function(el) {

    var gameId = $(el.target).parent().parent().attr('id');

    Meteor.call('addGamePlayer', gameId, Session.get('player'));

    Session.set('game', gameId);
    Session.set('page', 'room');
  }
});

Template.list.helpers({
  games : function() {
    return Games.find({});
  },
  larger : function(a, b) {
    return a > b;
  }
})

/**
 * Create
 */
Template.create.events({
  'click #submit':function() {

    var gameName = document.getElementById('gameName').value;
    var maxPlayers = parseInt(document.getElementById('maxPlayers').value);
    var player = Session.get('player');
    var game;
    player.owner = true; // game owned by player who created it

    console.log('gameName', gameName);
    console.log('maxPlayers', maxPlayers);

    game = {
      gameName: gameName,
      maxPlayers : maxPlayers,
      numberOfPlayers : 1, // creating the room goes in it!
      date: +new Date,
      status: 'new',
      players: [
        player
      ],
      owner: Session.get('player')._id
    }

    Meteor.call('addGame', game, function(err, gameId) {
      Session.set('game', gameId);
      Session.set('page', 'room');
    });
  }
});

/**
 * Room
 */
// Template.room.onCreated(function() {
//
//   console.log('Template.room.onCreated() called!');
//
//
// });
//
// Template.room.onDestroyed(function() {
//   // Games.after.update.remove();
// });

Template.room.helpers({
  game : function() {
    return Games.findOne(Session.get('game'));
  },
  isOwner : function() {
    return Games.findOne(Session.get('game')).owner === Session.get('player')._id;
  },
  isFull : function() {
    return Games.findOne(Session.get('game')).maxPlayers === Games.findOne(Session.get('game')).numberOfPlayers;
  }
});

Template.room.events({
  'click #start':function() {
    console.log('starting game!');

    Meteor.call('setGameStatus', Session.get('game'), 'starting')

    // page change handled via collection hook
    // Session.set('page', 'startGame');
  },
  'click #drop':function() {

    Meteor.call('deleteGame', Session.get('game'));

    Session.set('game', '');
    Session.set('page', 'list');
  }
});
