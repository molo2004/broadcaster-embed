/* global requirejs */
requirejs.config({
	baseUrl: 'scripts/',

	paths: {
		app: 'app',

		playerapi: 'vendor/playerapi.min',
		swfobject: '//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject',
		jquery: '//code.jquery.com/jquery-1.11.1.min',
		bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min'
	},

	shim: {
		bootstrap: {
			deps: ['jquery']
		}
	}
});
