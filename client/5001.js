
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
    console.log('login');
    Session.set('page', 'login');
  },
  'click #guest': function() {
    console.log('guest');
    Session.set('page', 'guest');
  },
  'click #rules': function() {
    console.log('rules');
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
  'click #submit':function() {
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
    Session.set('page', 'room');
  }
});
