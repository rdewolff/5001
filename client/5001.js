
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

/**
* Rules
*/
Template.rules.events({
  'click #home':function() {
    Session.set('page', 'home');
  }
})

/**
* Guest
*/
Template.guest.events({
  'click #submit':function(ev) {

    var name = document.getElementById('name').value;

    Players.insert({
      name : name,
      guest : true,
      date : +new Date // timestamp
    });

    console.log('name', name);

    Session.set('page', 'list');
  }
});

Template.list.events({
  'click #create':function() {
    Session.set('page', 'create');
  }
});

Template.create.events({
  'click #submit':function() {

    var gameName = document.getElementById('gameName').value;
    var maxPlayers = document.getElementById('maxPlayers').value;

    console.log('gameName', gameName);
    console.log('maxPlayers', maxPlayers);

    Games.insert({
      gameName: gameName,
      maxPlayers : maxPlayers,
      date: +new Date
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
