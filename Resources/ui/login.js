var general = require('ui/styles/general'),
	styles = require('ui/styles/login'),
	self = Titanium.UI.createWindow(styles.loginWin),
	wrapper = Titanium.UI.createView(),
	logo = Titanium.UI.createView(styles.logo),
	contentWrapper = Titanium.UI.createView(styles.contentWrapper),
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
	r_nameField = Titanium.UI.createTextField(styles.r_nameField),
	r_telField = Titanium.UI.createTextField(styles.r_telField),
	r_emailField = Titanium.UI.createTextField(styles.r_emailField),
	r_passwordField = Titanium.UI.createTextField(styles.r_passwordField),
	r_password2Field = Titanium.UI.createTextField(styles.r_password2Field),
	registerBtn = Titanium.UI.createButton(styles.registerBtn),
	registerBtnLabel = Titanium.UI.createLabel(styles.registerBtnLabel),
	backBtn = Titanium.UI.createButton(styles.backBtn);
	
	

var layout = function() {
	wrapper.add(logo);

	// Setup login form
	loginWrapper.add(usernameField);
	loginWrapper.add(passwordField);
	loginBtn.add(loginBtnLabel);
	loginWrapper.add(loginBtn);

	// -- Setup not registered message
	notRegisteredWrapper.add(seperator);
	notRegisteredWrapper.add(nrTitle);
	notRegisteredWrapper.add(nrInfo);
	notRegisteredWrapper.add(nrLink);
	loginWrapper.add(notRegisteredWrapper);

	//wrapper.add(loginWrapper);

	// Setup register form
	registerWrapper.add(r_nameField);
	registerWrapper.add(r_telField);
	registerWrapper.add(r_emailField);
	registerWrapper.add(r_passwordField);
	registerWrapper.add(r_password2Field);
	registerBtn.add(registerBtnLabel);
	registerWrapper.add(registerBtn);

	// Move register form out of view
	//wrapper.add(registerWrapper);

	contentWrapper.add(loginWrapper);
	contentWrapper.add(registerWrapper);
	wrapper.add(contentWrapper);


	// Setup continue without login
	continueWrapper.add(continueLabel);
	self.add(continueWrapper);
	

	self.add(wrapper);
};

exports.load = function() {
	layout();

	self.open({modal: true});
};


// Events
notRegisteredWrapper.addEventListener('click', function() {
	debug('Switch to register form');

	animateToRegister();
});

backBtn.addEventListener('click', function() {
	debug('Switch to login form');

	animateToLogin();
});


loginBtn.addEventListener('click', function() {
	debug('Should validate login credentials');

	app.state = 'loggedin';
	self.close();
});

registerBtn.addEventListener('click', function() {
	debug('Should validate registration');
});

// Throw warning about no purchase-mode
continueWrapper.addEventListener('click', function() {
	noLoginAlert.show();
});

noLoginAlert.addEventListener('click', function(e) {
	if(e.index === 0) {
		debug('App is in limited state');
		
		Ti.App.fireEvent('loginwin.close');
		self.close(); // Close login win and go into no-buy mode
		app.state = 'limited';
	}
});



// Animations
var animateToRegister = function() {
	contentWrapper.animate({
		left: -general.dWidth,
		duration: 500,
		delay: 200
	});

	self.add(backBtn);
	backBtn.animate({
		opacity: 100,
		duration: 300,
		delay: 800
	});
};

var animateToLogin = function() {
	contentWrapper.animate({
		left: 0,
		duration: 500,
		delay: 300
	});

	backBtn.animate({
		opacity: 0,
		duration: 300
	}, function() {
		setTimeout(function() {
			self.remove(backBtn);
			}, 500);
	});
};