var general = require('ui/styles/general'),
	styles = require('ui/styles/Tabgroup'),
	u = require('plugins/utils'),
	tabgroup = Titanium.UI.createTabGroup(general.tabgroup),
	disable = Titanium.UI.createView(styles.disable),
	loginAlert = Titanium.UI.createAlertDialog(styles.loginAlert),
	BuyWin = require('ui/buy/Start').load(),
	TicketsWin = require('ui/tickets/Tickets').load(),
	ProfileWin = require('ui/profile/Profile').load();
	

var tabs = {
	buy: Titanium.UI.createTab({
		title: 'Kjøp billetter',
		window: BuyWin,
		icon: 'images/common/icon_buy.png'
	}),
	tickets: Titanium.UI.createTab({
		title: 'Mine billetter',
		window: TicketsWin,
		icon: 'images/common/icon-tickets.png'
	}),
	profile: Titanium.UI.createTab({
		title: 'Min profil',
		window: ProfileWin,
		icon: 'images/common/icon_user.png'
	})
	
}

exports.tabs = tabs;


exports.load = function() {
	
	if(!tabgroup.tabs) {
		
		tabgroup.addTab(tabs.buy);
		tabgroup.addTab(tabs.tickets);
		tabgroup.addTab(tabs.profile);
		
	}
	
	return tabgroup;
	
}


// Public API for handling tabs

exports.set = function(a) {
	
	tabgroup.setActiveTab(a);
	
}

exports.setBadge = function(i) {
	
	// Set tickets badge??
	
}

