Meteor.startup(function() {

	// initial page load 
	Session.set('page', 'home');

	// add missing class and id for template JS to work properly
	$('body').addClass('svg');
	$('body').attr('id', 'page-top');

});
