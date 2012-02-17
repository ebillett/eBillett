var general = require('ui/styles/general'),
	styles = require('ui/styles/tabgroup'),
	windows = {
		buy: require('ui/buy/start'),
		noLogin: require('ui/buy/places_nologin'),
		tickets: Titanium.UI.createWindow({title: 'tickets'}),
		profile: require('ui/profile/profile')
	},
	tabgroup = Titanium.UI.createTabGroup(general.tabgroup),
	tabs = {
		buy: Titanium.UI.createTab({
			title: 'Kjøp billetter',
			//window: windows.buy.load()
			//window: null
			//window: windows.noLogin.load()
		}),
		tickets: Titanium.UI.createTab({
			title: 'Mine billetter',
			window: windows.tickets.open()
		}),
		profile: Titanium.UI.createTab({
			title: 'Min profil',
			window: windows.profile.load()
		})
	},
	disable = Titanium.UI.createView(styles.disable),
	loginAlert = Titanium.UI.createAlertDialog(styles.loginAlert);

exports.load = function() {
	if(!tabgroup.tabs) {
		tabgroup.addTab(tabs.buy);
		tabgroup.addTab(tabs.tickets);
		tabgroup.addTab(tabs.profile);
	}

	tabgroup.open();
};

exports.set = function(a) {
	tabgroup.setActiveTab(a);
};

exports.setBadge = function(i) {

	tabs.tickets.setBadge(1);
	
};

exports.shutdown = function() {
	//tabgroup.close();
};

exports.tabs = tabs;



// Set start for buy tab depending on logged in state
exports.setBuyWin = function(loggedin) {
	tabs.buy.setWindow(loggedin ? windows.buy.load() : windows.noLogin.load());
	tabs.buy.setTitle(loggedin ? 'Kjøp billetter' : 'Vis program');
};



Ti.App.addEventListener('loginwin.close', function() {
	if(app.state == 'limited') {
		tabgroup.add(disable); // Lock down profile stuff
		//tabs.buy.setWindow(windows.noLogin.load());
		debug('niggaw');
		//tabgroup.open(windows.noLogin.load());

	} else if(app.state == 'normal') {
		tabgroup.remove(disable); // Open profile stuff
		tabs.buy.window = windows.buy.load();

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