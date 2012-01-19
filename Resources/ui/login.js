var general = require('ui/styles/general'),
	styles = require('ui/styles/login'),
	self = Titanium.UI.createWindow(styles.loginWin),
	wrapper = Titanium.UI.createView(general.wrapper),
	logo = Titanium.UI.createView(styles.logo),
	mode = 'login',
	loginWrapper = Titanium.UI.createScrollView(styles.loginWrapper),
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
		//loginBtn.type = 'register';
		mode = 'register';
	} else {
		debug('Login button is now for logging in');

		loginBtnLabel.text = 'LOGG INN';
		//loginBtn.type = 'login';
		mode = 'login';
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
	mode = 'register';
	animateToRegister();
});


backBtn.addEventListener('click', function() {
	debug('Change to login form');
	mode = 'login';
	animateToLogin();
});

var animateToRegister = function() {
	// Hide register text
	notRegisteredWrapper.animate({
		opacity: 0,
		top: 262,
		duration: 500
	}, function() {
		wrapper.remove(notRegisteredWrapper);
	});

	// Expand wrapper to hold extra fields
	loginWrapper.animate({
		height: 300,
		top: 95,
		duration: 500,
		delay: 350
	});
	
	// Move down to make room
	loginBtn.animate({
		top: 240,
		duration: 500,
		delay: 400
	});

	usernameField.animate({
		top: usernameField.top + 100,
		duration: 500,
		delay: 450
	});

	passwordField.animate({
		top: passwordField.top + 100,
		duration: 500,
		delay: 350
	});

	loginWrapper.add(nameField);
	nameField.animate({
		opacity: 100,
		duration: 500,
		delay: 650
	});

	loginWrapper.add(telField);
	telField.animate({
		opacity: 100,
		duration: 500,
		delay: 650
	});

	loginWrapper.add(repeatPwField);
	repeatPwField.animate({
		opacity: 100,
		duration: 500,
		delay: 650
	}, function() {
		loginBtnLabel.text = 'REGISTRER';
	});

	//loginWrapper.add(repeatPwField);

	self.add(backBtn);
};

var animateToLogin = function() {
	repeatPwField.animate({
		opacity: 0,
		duration: 500
	}, function() {
		loginWrapper.remove(repeatPwField);
	});

	telField.animate({
		opacity: 0,
		duration: 500
	}, function() {
		loginWrapper.remove(telField);
	});

	nameField.animate({
		opacity: 0,
		duration: 500
	}, function() {
		loginWrapper.remove(nameField);
	});

	passwordField.animate({
		top: 46,
		duration: 500,
		delay: 650
	});

	usernameField.animate({
		top: 0,
		duration: 500,
		delay: 650
	});

	

};

