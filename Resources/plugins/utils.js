exports.setString = function(name, value) {
	Ti.App.Properties.setString(name, value);
};

exports.getString = function(name) {
	return Ti.App.Properties.getString(name);
};

exports.setBool = function(name, value) {
	Ti.App.Properties.setBool(name, value);
};

exports.getBool = function(name) {
	return Ti.App.Properties.getBool(name);
};




// Programatically logging out during development
exports.logOut = function() {
	if(DEBUG) {
		Ti.App.Properties.setString('user:loggedIn', 0);
	}
};