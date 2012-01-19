var general = require('ui/styles/general'),
	styles = require('ui/styles/login'),
	self = Titanium.UI.createWindow(styles.loginWin),
	wrapper = Titanium.UI.createView(general.wrapper),
	logo = Titanium.UI.createView(styles.logo),
	loginWrapper = Titanium.UI.createView(styles.loginWrapper),
	usernameField = Titanium.UI.createTextField(styles.usernameField),
	passwordField = Titanium.UI.createTextField(styles.passwordField),
	loginBtn = Titanium.UI.createButton(styles.loginBtn),
	loginBtnLabel = Titanium.UI.createLabel(styles.loginBtnLabel),
	seperator = Titanium.UI.createView(styles.seperator),
	notRegisteredWrapper = Titanium.UI.createView(styles.notRegisteredWrapper),
	nrTitle = Titanium.UI.createLabel(styles.nrTitle),
	nrInfo = Titanium.UI.createLabel(styles.nrInfo),
	nrLink = Titanium.UI.createLabel(styles.nrLink),
	continueWrapper = Titanium.UI.createView(styles.continueWrapper),
	continueLabel = Titanium.UI.createLabel(styles.continueLabel),
	noLoginAlert = Titanium.UI.createAlertDialog(styles.noLoginAlert),
	registerWrapper = Titanium.UI.createView(styles.registerWrapper),
	nameField = Titanium.UI.createTextField(styles.nameField),
	telField = Titanium.UI.createTextField(styles.telField),
	repeatPwField = Titanium.UI.createTextField(styles.repeatPwField),
	backBtn = Titanium.UI.createButton(styles.backBtn);
	
	

var layout = function() {
	wrapper.add(logo);

	// Setup login form
	loginWrapper.add(usernameField);
	loginWrapper.add(passwordField);
	loginBtn.add(loginBtnLabel);
	loginWrapper.add(loginBtn);
	wrapper.add(loginWrapper);

	// Setup not registered message
	notRegisteredWrapper.add(seperator);
	notRegisteredWrapper.add(nrTitle);
	notRegisteredWrapper.add(nrInfo);
	notRegisteredWrapper.add(nrLink);
	wrapper.add(notRegisteredWrapper);

	// Setup continue without login
	continueWrapper.add(continueLabel);
	self.add(continueWrapper);

	// Setup register form
	registerWrapper.add(nameField);
	registerWrapper.add(telField);
	

	self.add(wrapper);
};

exports.load = function() {
	layout();

	self.open({modal: true});
};


// Toggle login or register state for button
var toggleLoginBtn = function(a) {
	if(a === 1) {
		debug('Login button is now for registration');

		loginBtnLabel.text = 'REGISTRER';
		loginBtn.type = 'register';
	} else {
		debug('Login button is now for logging in');

		loginBtnLabel.text = 'LOGG INN';
		loginBtn.type = 'login';
	}
};

loginBtn.addEventListener('click', function() {
	alert('hei');
});

// Throw warning about no purchase-mode
continueWrapper.addEventListener('click', function() {
	noLoginAlert.show();
});

noLoginAlert.addEventListener('click', function(e) {
	if(e.index === 0) {
		self.close(); // Close login win and go into no-buy mode

		debug('App is in no buy-mode');
	} else {
		noLoginAlert.hide();
	}
});

notRegisteredWrapper.addEventListener('click', function() {
	debug('Change to registration form');
	animateToRegister();
});

//
// Animations
//

var animateToRegister = function() {
	// Fade out not registered-text
	notRegisteredWrapper.animate({
		top: 262,
		opacity: 0,
		duration: 500
	});

	// Move loginwrapper down
	loginWrapper.animate({
		top: 185,
		duration: 500,
		delay: 200
	});

	// Move button further down to make place for verify pw field
	loginBtn.animate({
		top: 145,
		duration: 500,
		delay: 200
	});

	// Add extra fields
	self.add(registerWrapper);
	registerWrapper.animate({
		opacity: 100,
		duration: 500,
		delay: 500
	});

	// Add verify pw field
	self.add(repeatPwField);
	repeatPwField.animate({
		opacity: 100,
		duration: 500,
		delay: 500
	});

	// Add back button
	self.add(backBtn);
	backBtn.animate({
		opacity: 100,
		duration: 500,
		delay: 700
	});

	backBtn.addEventListener('click', function() {
		debug('Change to login form');
		animateToLogin();
	});

	// Change to register mode
	//setTimeout(toggleLoginBtn(1), 2000);
	toggleLoginBtn(1);
};

var animateToLogin = function() {
	// Remove back button
	//self.remove(backBtn);

	repeatPwField.animate({
		opacity: 0,
		duration: 500
	});
};
