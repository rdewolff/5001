if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.main.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.main.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Template.main.rendered = function() {

  console.log('rendered!');

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
