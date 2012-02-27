var general = require('ui/styles/general'),
	styles = require('ui/styles/tabgroup'),
	app,
	windows = {
		buy: require('ui/buy/start'),
		//buy: Titanium.UI.createWindow({title: 'buy'}),
		tickets: Titanium.UI.createWindow({title: 'tickets'}),
		profile: require('ui/profile/profile')
		//profile: Titanium.UI.createWindow({title: 'profile'})
	},
	tabgroup = Titanium.UI.createTabGroup(general.tabgroup),
	// tabs = {
	// 	buy: Titanium.UI.createTab({
	// 		title: 'Kjøp billetter',
	// 		//window: windows.buy.open()
	// 		//window: windows.buy.load()
	// 	}),
	// 	tickets: Titanium.UI.createTab({
	// 		title: 'Mine billetter',
	// 		window: windows.tickets.open()
	// 	}),
	// 	profile: Titanium.UI.createTab({
	// 		title: 'Min profil',
	// 		//window: windows.profile.open()
	// 		window: windows.profile.load()
	// 	})
	// },
	tabs,
	disable = Titanium.UI.createView(styles.disable),
	loginAlert = Titanium.UI.createAlertDialog(styles.loginAlert);


// Tabgroup bootstrapper
exports.load = function(exports) {

	app = exports;

	var myTabs = {
		buy: Titanium.UI.createTab({
			title: 'Kjøp billetter',
			//window: windows.buy.open()
			window: windows.buy.load(app)
		}),
		tickets: Titanium.UI.createTab({
			title: 'Mine billetter',
			window: windows.tickets.open()
		}),
		profile: Titanium.UI.createTab({
			title: 'Min profil',
			//window: windows.profile.open()
			window: windows.profile.load(app)
		})
	};

	tabs = myTabs;

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


Ti.App.addEventListener('loginwin.close', function(e) {

	isLoggedIn = e.loggedIn;

	if(!isLoggedIn) {

		tabgroup.add(disable); // Lock down profile stuff
		//tabs.buy.setWindow(windows.noLogin.load());
		//tabgroup.open(windows.noLogin.load());

	
	} else {
	
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