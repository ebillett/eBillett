
var tabgroup = require('ui/Tabgroup'),
	u = require('plugins/utils');

exports.db = require('services/db');
exports.net = require('services/network');
exports.u = u;
exports.social = require('services/social');

exports.oldWin = [];


exports.launch = function() {
	
	Ti.UI.backgroundImage = 'images/common/cover.png';
	
	app.checkLoggedIn(function(isLoggedIn) {
			
		if(!isLoggedIn) {
			
			// User is is not logged in
			app.openLoginDialog();
			
		} else {
			
			// User is logged in
			tabgroup = tabgroup.load();
			tabgroup.open();
			
		}
			
	});
	
	
	Ti.App.addEventListener('loginwin.close', function(e) {
		
		if(e.loggedIn) {
							
			//tabgroup = tabgroup.load();
			var tabgroup = require('ui/Tabgroup').load();
			tabgroup.open();
							
		} else {
			
			var Limited = require('ui/buy/Limited').load()
			Limited.open();
							
		}
		
	});
	
	
}

Ti.App.addEventListener('openLoginDialog', function() {
	
	exports.openLoginDialog();
	
})

exports.openLoginDialog = function() {
	
	require('ui/Login').load();
	
}



exports.checkLoggedIn = function(callback) {
	
	var loggedIn = u.getBool('user:loggedin');
		
		if(!loggedIn || loggedIn == false) {
			
			debug('User is not logged in');
			
			u.setBool('purchaseMode', false);
			
			callback(false);
			return false;
			
		} else {
			
			debug('User is logged in');
			
			exports.user.getInfo();
			
			u.setBool('purchaseMode', true);
			
			callback(true);
			return true;
			
		}
	
}





// ------------------------------------
// Global user obj
// ------------------------------------

exports.user = {
	
	info: {},
	
	login: function(user) {
		
		debug('Persisting login credentials for ' + user.epost + ' with id: ' + user.profil_id);

		exports.user.info = user;
		
		u.setBool('user:loggedin', true);
		u.setString('user:info', JSON.stringify(user));
		
	},
	
	logout: function() {
		
		debug('Logging out user');
		
		var user = JSON.parse(u.getString('user:info'));
		
		debug('Logging out user: ' + user.epost + ' with id: ' + user.profil_id);

		u.setBool('user:loggedin', false);
		u.setString('user:info', '-');

		// Open login dialog
		exports.openLoginDialog();
		
		
	},
	
	getInfo: function(callback) {
		
		var user = JSON.parse(u.getString('user:info'));
		exports.user.info = user;

		debug('Stored credentials for logged in user is ' + user.epost + ' with id: ' + user.profil_id);
		
		if(callback) {
			
			return user;
			
		}
	}
	
	
}


