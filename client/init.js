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
	// Session.set("MeteorToys_display", true);

});

/*
// TODO: In the publish function, you can watch socket close event as follows
this.session.socket.on "close", -> # do your thing
*/
