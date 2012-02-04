var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/show_cinema'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	tabbar = require('ui/buy/components/tabbar').init(),
	wrapper = Ti.UI.createScrollableView(),
	currentView = require('ui/buy/components/cinema_current'),
	programView = Titanium.UI.createView({backgroundColor: '#ff0000'}),
	comingView = Titanium.UI.createView({backgroundColor: '#ff00f0'}),
	loadedCurrent = false,
	loadedProgram = false,
	loadedComing = false;



function layout(obj) {
	self.titleControl = general.defaultTitle(obj.name);

	// Setup tabbar
	self.add(tabbar);

	self.add(general.shadowTop(43));

	// Setup scrollable view
	self.add(currentView.load());
	
	// Initiate
	//setView(0);
}

exports.load = function(obj) {
	// Set place object to properties
	app.prop.place = obj;

	layout(obj);

	return self;
};


function setView(id) {
	alert('jadda');
}


self.addEventListener('close', function() {
	// set loaded to
	self.remove(tabbar);
});