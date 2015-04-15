
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

Template.container.helpers({
  getSessionPage : function() {
    console.log('session page', Session.get('page'));
    return Session.get('page');
  },
  getPlayer : function() {
    return Session.get('player');
  }
});

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

      // insert player in database and save to session
      Players.insert(player, function(err, id) {
        Session.set('player', player)
      });

      console.log('name', name);

      Session.set('page', 'list');
    } else {
      $('#name').parent().addClass('has-error');
    }
  },
  'click #home':function() {
    Session.set('page', 'home');
  }
});

Template.list.events({
  'click #create':function() {
    Session.set('page', 'create');
  },
  'click #join':function(el) {

    var gameId = $(el.target).parent().parent().attr('id');

    // insert player in the game
    Games.update(gameId,
      {
        $inc: {numberOfPlayers: 1},
        $push: {
          players : Session.get('player')
        }
      });

    Session.set('page', 'room')
  }
});

Template.list.helpers({
  games : Games.find({}),
  larger : function(a, b) {
    return a > b;
  }
})

Template.create.events({
  'click #submit':function() {

    var gameName = document.getElementById('gameName').value;
    var maxPlayers = document.getElementById('maxPlayers').value;

    console.log('gameName', gameName);
    console.log('maxPlayers', maxPlayers);

    Games.insert({
      gameName: gameName,
      maxPlayers : maxPlayers,
      numberOfPlayers : 1, // creating the room goes in it!
      date: +new Date,
      status: 'new',
      players: [
        Session.get('player')
      ]
    });

    console.log('inserted');

    Session.set('page', 'room');
  }
});

Template.room.events({
  'click #start':function() {
    Session.set('page', 'startGame');
  }
});
