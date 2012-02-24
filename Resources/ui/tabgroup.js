var general = require('ui/styles/general'),
	styles = require('ui/styles/tabgroup'),
	windows = {
		buy: require('ui/buy/start'),
		//buy: Titanium.UI.createWindow({title: 'buy'}),
		tickets: Titanium.UI.createWindow({title: 'tickets'}),
		//profile: require('ui/profile/profile')
		profile: Titanium.UI.createWindow({title: 'profile'})
	},
	tabgroup = Titanium.UI.createTabGroup(general.tabgroup),
	tabs = {
		buy: Titanium.UI.createTab({
			title: 'Kjøp billetter',
			//window: windows.buy.open()
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


// Tabgroup bootstrapper
exports.load = function() {

	debug(GLOBAL);

	// Check that tabgroup hasn't been built already
	if(!tabgroup.tabs) {
		tabgroup.addTab(tabs.buy);
		tabgroup.addTab(tabs.tickets);
		tabgroup.addTab(tabs.profile);
	}

	tabgroup.open();
};


// Change tab
exports.set = function(a) {
	tabgroup.setActiveTab(a);
};

// !!!!!
// Set badge function for tickets?
// !!!!!


// Give app wide access to tab objects
exports.tabs = tabs;


Ti.App.addEventListener('loginwin.close', function() {
	
	if(app.state == 'limited') {
	
		tabgroup.add(disable); // Lock down profile stuff
		//tabs.buy.setWindow(windows.noLogin.load());
		//tabgroup.open(windows.noLogin.load());

	
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