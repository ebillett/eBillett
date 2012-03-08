var general = require('ui/styles/general'),
	styles = require('ui/styles/Login'),
	net = require('services/network'),
	self = Titanium.UI.createWindow(styles.loginWin),
	wrapper = Titanium.UI.createView(),
	logo = Titanium.UI.createView(styles.logo),
	modeSelect = Titanium.UI.iOS.createTabbedBar(styles.modeSelect),
	modeLogin = Titanium.UI.createButton(styles.modeLogin),
	loginWrapper = Titanium.UI.createView(styles.loginWrapper),
	usernameField = Titanium.UI.createTextField(styles.usernameField),
	passwordField = Titanium.UI.createTextField(styles.passwordField),
	loginBtn = Titanium.UI.createButton(styles.loginBtn),
	loginBtnLabel = Titanium.UI.createLabel(styles.loginBtnLabel),
	continueWrapper = Titanium.UI.createView(styles.continueWrapper),
	continueLabel = Titanium.UI.createLabel(styles.continueLabel),
	noLoginAlert = Titanium.UI.createOptionDialog(styles.noLoginAlert);
	
	

var layout = function() {
	wrapper.add(logo);
	
	loginWrapper.add(modeSelect);
	loginWrapper.add(usernameField);
	loginWrapper.add(passwordField);

	loginBtn.add(loginBtnLabel);
	loginWrapper.add(loginBtn);

	wrapper.add(loginWrapper);
	

	// Setup continue without login
	continueWrapper.add(continueLabel);
	self.add(continueWrapper);
	

	self.add(wrapper);
};

exports.load = function(modal) {
	layout();

	self.open({modal: true});
	
	// if(modal) {
	// 	self.open({modal: true});
	// } else {
	// 	self.open();
	// }
};

modeSelect.addEventListener('click', function(e) {
	if(e.index == 0) {
		debug('login-mode');
	} else {
		debug('register-mode');
	}
});


loginBtn.addEventListener('click', function() {
	if(usernameField.value && passwordField.value) {
		var user = {
			email: usernameField.value,
			password: passwordField.value
		}

		// Burde regexe epostadresse
		if(modeSelect.index == 1) {

			net.user.register(user, function(responseData) {
				
				if(responseData) {

					debug('response');
					debug(JSON.stringify(responseData));

				} else {

					alert('En feil har oppstått. Prøv igjen.');

				}

			})


		} else if (modeSelect.index == 0) {

			debug('logging in');

		}

	} else {
		alert('Epostadresse og passord er påkrevd');
	}
});

// Throw warning about no purchase-mode
continueWrapper.addEventListener('click', function() {
	noLoginAlert.show();
});

noLoginAlert.addEventListener('click', function(e) {
	if(e.index === 0) {
		debug('App is in limited state');
		
		Ti.App.fireEvent('loginwin.close', {loggedIn: false});
		app.state = 'limited'; // Set app state
		self.close(); // Close login win and go into no-buy mode
	}
});

self.addEventListener('close', function() {
	loginWrapper.remove(modeSelect);
	loginWrapper.remove(usernameField);
	loginWrapper.remove(passwordField);
	loginWrapper.remove(loginBtn);

	wrapper.add(loginWrapper);


	// Setup continue without login
	continueWrapper.remove(continueLabel);
	self.remove(continueWrapper);
	

	self.add(wrapper);
});

