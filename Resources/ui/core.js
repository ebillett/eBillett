
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
	var loggedIn = exports.getString('user:loggedIn');

	if(!loggedIn || loggedIn === false) {
		debug('Is not logged in.');
		callback(false);
		return false;
	} else {
		callback(true); // is logged in
		return true;
	}
};

exports.loginDialog = function() {
	require('ui/login').load();
};