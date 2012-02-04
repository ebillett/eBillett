var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/show_cinema'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	tabbar = require('ui/buy/components/tabbar').init(),
	wrapper = Ti.UI.createScrollableView(),
	currentView = require('ui/buy/components/cinema_current'),
	programView = Titanium.UI.createView({backgroundColor: '#26b5c2'}),
	comingView = Titanium.UI.createView({backgroundColor: '#c29f26'}),
	loadedCurrent = false,
	loadedProgram = false,
	loadedComing = false;



function layout(obj) {
	self.titleControl = general.defaultTitle(obj.name);

	// Setup tabbar
	self.add(tabbar);

	self.add(general.shadowTop(43));

	// Setup scrollable view
	wrapper.setViews([currentView.load(), programView, comingView]);
	wrapper.setCurrentPage(0);
	self.add(wrapper);
	
	// Initiate
	setView(0);
}

exports.load = function(obj) {
	// Set place object to properties
	app.prop.place = obj;

	layout(obj);

	return self;
};


function setView(id) {
	if(id === 0) {
		wrapper.scrollToView(0);
	}
}


self.addEventListener('close', function() {
	// set loaded to
	self.remove(tabbar);
});