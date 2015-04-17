Meteor.subscribe('games');
Meteor.subscribe('players');

Meteor.startup(function() {

	// initial page load
	Session.set('page', 'home');

	// add missing class and id for template JS to work properly
	$('body').addClass('svg');
	$('body').attr('id', 'page-top');

	// avoid quit game without knowing
	// TODO: enable page unload protection
	/*window.onbeforeunload = function() {
		return "Voulez-vous vraiment quitter?";
	};*/

	// Display Mongol and JetSetter // TODO : remove in prod
	Session.set("MeteorToys_display", true);

});

/*
// TODO: In the publish function, you can watch socket close event as follows
this.session.socket.on "close", -> # do your thing
*/

// // Games action
// Games.after.update(function(userId, doc, fieldNames, modifier, options){
//   /* debug :
//   console.log('userId', userId);
//   console.log('doc', doc);
//   console.log('fieldNames', fieldNames);
//   console.log('modifier', modifier);
//   console.log('options', options); */
//   // if change concern the game am in
//   console.log('Games.after.update() triggered');
//   console.log('doc._id', doc._id);
//   console.log('Session.get(game)', Session.get('game'));
//   console.log('fieldNames[0]', fieldNames[0]);
//
//   if (doc._id === Session.get('game')) {
//     if (fieldNames[0] === "status") {
//       if (modifier.$set.status === 'starting') {
//         console.log('switching page to startGame');
//         Session.set('page', 'startGame');
//       }
//     }
//   }
// });
