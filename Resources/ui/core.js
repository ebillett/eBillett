
// Private objects
var whatever;

//exports.db = require('services/db/general');
//exports.net = require('services/net/general');
//exports.utils = require('plugins/utils');


exports.launch = function() {
	
	require('ui/tabgroup').load();

};

exports.setString = function(name, value) {
	Ti.App.Properties.setString(name, value);
};

exports.getString = function(name) {
	return Ti.App.Properties.getString(name);
};

// Check if we are logged in
exports.checkLoggedIn = function(callback) {
	debug('Checking if user is logged in.');
	var loggedIn = exports.getString('user:loggedin');

	if(!loggedIn || loggedIn === false) {
		debug('Is not logged in.');
		callback(false);
		return false;
	} else {
		debug('Is logged in');
		exports.user.getInfo();
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
		exports.setString('user:loggedin', true);
		exports.setString('user:info', JSON.stringify(user));
	},
	logout: function() {
		var user = JSON.parse(exports.getString('user:info'));
		debug(user);

		exports.setString('user:loggedin', false);
		exports.setString('user:info', '');
	},
	getInfo: function() {
		var user = JSON.parse(exports.getString('user:info'));
		exports.user.info = user;

		debug('User is logged in as ' + user.name + ' with id: ' + user.id);
	}
};