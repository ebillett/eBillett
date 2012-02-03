var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/show_cinema'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	tabbar = require('ui/buy/components/tabbar');
	currentView = require('ui/buy/components/cinema_current');



function layout(obj) {
	self.titleControl = general.defaultTitle(obj.name);

	// Setup tabbar
	self.add(tabbar.init());

	self.add(general.shadowTop(43));
	
	// Initiate
	setView(0);
}

exports.load = function(obj) {
	layout(obj);

	return self;
};


function setView(id) {
	if(id === 0) {
		currentView = currentView.load();
		self.add(currentView);
	}
}