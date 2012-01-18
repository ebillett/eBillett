var general = require('ui/styles/general'),
	styles = require('ui/styles/login'),
	wrapper = Titanium.UI.createView(general.wrapper),
	loginWrapper = Titanium.UI.createView(styles.loginWrapper),
	usernameField = Titanium.UI.createTextField(styles.usernameField),
	passwordField = Titanium.UI.createTextField(styles.passwordField),
	loginBtn = Titanium.UI.createButton(styles.loginBtn),
	self = Titanium.UI.createWindow(styles.loginWin);

var layout = function() {
	
	// Setup login form
	loginWrapper.add(usernameField);
	loginWrapper.add(passwordField);
	loginWrapper.add(loginBtn);
	wrapper.add(loginWrapper);

	self.add(wrapper);
};

exports.load = function() {
	layout();

	self.open({modal: true});
};