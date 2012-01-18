var general = require('ui/styles/general'),
	windows = {
		buy: require('ui/buy/start'),
		tickets: Titanium.UI.createWindow({title: 'tickets'}),
		profile: Titanium.UI.createWindow({title: 'profile'})
	},
	tabgroup = Titanium.UI.createTabGroup(general.tabgroup);
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
	};

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