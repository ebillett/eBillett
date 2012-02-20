var self = Titanium.UI.createWindow({
		//backgroundImage: 'images/cover.png'
		backgroundColor: '#ff0000'
	}),
	tabgroup = require('ui/tabgroup');

exports.load = function() {
	app.checkLoggedIn(function(loggedIn) {
		if(!loggedIn) {
			//app.loginWin.open({modal: true});
			app.loginDialog();
		} else {
			self.close();
			tabgroup.setBuyWin(true);
			tabgroup.load();
		}
	});

	return self;
};

Ti.App.addEventListener('loginwin.close', function() {
	if(app.state == 'limited') {
		tabgroup.setBuyWin(false);
	} else if(app.state == 'normal') {
		tabgroup.setBuyWin(true);
	}

	tabgroup.load();
});