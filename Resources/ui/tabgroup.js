var general = require('ui/styles/general'),
	styles = require('ui/styles/tabgroup'),
	windows = {
		buy: require('ui/buy/start'),
		tickets: Titanium.UI.createWindow({title: 'tickets'}),
		profile: Titanium.UI.createWindow({title: 'profile'})
	},
	tabgroup = Titanium.UI.createTabGroup(general.tabgroup),
	tabs = {
		buy: Titanium.UI.createTab({
			title: 'Kjøp billetter',
			window: windows.buy.load()
		}),
		tickets: Titanium.UI.createTab({
			title: 'Mine billetter',
			window: windows.tickets.open()
		}),
		profile: Titanium.UI.createTab({
			title: 'Min profil',
			window: windows.profile.open()
		})
	},
	disable = Titanium.UI.createView(styles.disable),
	loginAlert = Titanium.UI.createAlertDialog(styles.loginAlert);

exports.load = function() {
	tabgroup.addTab(tabs.buy);
	tabgroup.addTab(tabs.tickets);
	tabgroup.addTab(tabs.profile);

	tabgroup.open();

	
	app.checkLoggedIn(function(loggedIn) {
		if(!loggedIn) {
			//app.loginWin.open({modal: true});
			app.loginDialog();
		}
	});
};

exports.set = function(a) {
	tabgroup.setActiveTab(a);
};

Ti.App.addEventListener('loginwin.close', function() {
	if(app.state == 'limited') {
		tabgroup.add(disable); // Lock down profile stuff
	} else if(app.state == 'normal') {
		tabgroup.remove(disable); // Open profile stuff
	}
});

disable.addEventListener('click', function() {
	loginAlert.show();
});

loginAlert.addEventListener('click', function(e) {
	if(e.index === 0) {
		// Open login win
		app.loginDialog();
	}
});