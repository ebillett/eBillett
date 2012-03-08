var general = require('ui/styles/general'),
	styles = require('ui/styles/Login'),
	net = require('services/network'),
	u = require('plugins/utils'),
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
			// Show loader
			var loader = u.loading(null, 'Registrer bruker...');
			self.add(loader);

			net.user.register(user, function(responseData) {
				
				if(responseData) {
					
					if(responseData.result.status == 'NOK') {
						// Error
						alert(responseData.result.message);	
					
					} else {
						// Registered
						debug(JSON.stringify(responseData));

					}

					u.fadeout(loader, function() {
						self.remove(loader);
					});

				} else {

					alert('En feil har oppstått. Prøv igjen.');
					u.fadeout(loader, function() {
						self.remove(loader);
					});

				}

			});


		} else if (modeSelect.index == 0) {

			// Show loader
			var loader = u.loading(null, 'Logger inn...');
			self.add(loader);

			net.user.login(user, function(responseData) {
				
				if(responseData) {
					
					if(responseData.result.status == 'NOK') {
						// Error
						alert(responseData.result.message);	
					
					} else {
						// Verified
						debug(JSON.stringify(responseData));

						var user = {
							id: '1',
							name: 'Martin Berg',
							email: 'martin@dx.no',
							tel: '',
							password: 'martin'
						};

						Ti.App.fireEvent('loginwin.close', {loggedIn: true});
						u.setBool('purchaseMode', true);
						app.user.login(user);
						self.close();

					}


					u.fadeout(loader, function() {
						self.remove(loader);
					});


				} else {

					alert('En feil har oppstått. Prøv igjen.');
					u.fadeout(loader, function() {
						self.remove(loader);
					});

				}

			});

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

