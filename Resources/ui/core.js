
// Private objects
var whatever;

exports.db = require('services/db');
exports.net = require('services/network');
//exports.u = require('plugins/utils');

exports.prop = {};

exports.launch = function() {
	
	require('ui/tabgroup').load();

};

exports.setString = function(name, value) {
	Ti.App.Properties.setString(name, value);
};

exports.getString = function(name) {
	return Ti.App.Properties.getString(name);
};



// User stuff


// Check if we are logged in
exports.checkLoggedIn = function(callback) {
	debug('Checking if user is logged in.');
	
	var loggedIn = exports.getString('user:loggedin');
	
	if(!loggedIn || loggedIn == 'false') {
		debug('Is not logged in.');
		callback(false);
		return false;
	} else {
		debug('Is logged in.');
		exports.user.getInfo();
		app.state = 'normal';
		callback(true); // is logged in
		return true;
	}
};

exports.loginDialog = function() {
	require('ui/login').load();
};

exports.user = {
	info: {},
	login:  function(user) {
		debug('Persisting login credentials for ' + user.name + ' with id: ' + user.id);
		exports.setString('user:loggedin', 'true');
		exports.setString('user:info', JSON.stringify(user));
	},
	logout: function() {
		debug('Logging out user');
		
		var user = JSON.parse(exports.getString('user:info'));
		
		debug('Logging out user: ' + user.name + ' with id: ' + user.id);

		exports.setString('user:loggedin', 'false');
		exports.setString('user:info', '-');

		// Open login dialog
		exports.loginDialog();

		// Set tab to Buy
		require('ui/tabgroup').set(0);
	},
	getInfo: function() {
		var user = JSON.parse(exports.getString('user:info'));
		exports.user.info = user;

		debug('Stored credentials for logged in user is ' + user.name + ' with id: ' + user.id);
	}
};