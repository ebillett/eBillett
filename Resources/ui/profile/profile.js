var general = require('ui/styles/general'),
	styles = require('ui/styles/profile/profile'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	logoutBtn = Titanium.UI.createButton(styles.logoutBtn);


	self.titleControl = general.defaultTitle('Min profil');


var layout = function() {
	wrapper.add(logoutBtn);

	self.add(wrapper);
};

exports.load = function() {
	layout();

	return self;
};

self.addEventListener('focus', function() {
	if(app.state) {
		debug('buy window has focus');
	}
});

logoutBtn.addEventListener('click', function() {
	app.user.logout();
});