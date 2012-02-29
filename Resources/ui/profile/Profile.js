var general = require('ui/styles/general'),
	styles = require('ui/styles/profile/Profile'),
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


logoutBtn.addEventListener('click', function() {
	app.user.logout();
	require('ui/Tabgroup').set(0);
});
