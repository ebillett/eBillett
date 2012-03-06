var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/ShowCinema'),
	u = require('plugins/utils'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	selfView = Titanium.UI.createView(),
	shadow = general.shadowTop(43),
	tabbar = require('ui/buy/components/TabBar'),
	wrapper = Ti.UI.createScrollableView(),
	currentView = require('ui/buy/components/CinemaCurrent'),
	programView = require('ui/buy/components/CinemaProgram'),
	comingView = Titanium.UI.createView({backgroundColor: '#c29f26'}),
	loadedCurrent = false,
	loadedProgram = false,
	loadedComing = false;



function layout(obj) {
	
	self.titleControl = general.defaultTitle(obj.name);

	// Setup tabbar
	self.add(tabbar.init());
	self.add(shadow);

	
	// Setup scrollable view
	wrapper.setViews([currentView.load(), programView.load(), comingView]);
	wrapper.setCurrentPage(0);
	self.add(wrapper);
	
	
	if(!u.getBool('purchaseMode')) {
		var banner = Titanium.UI.createView({backgroundColor: '#222', height: 50, bottom: 0});
		self.add(banner);
		
		banner.addEventListener('click', function() {
			Ti.App.fireEvent('openLoginDialog', {from: 'placeLimited'});
			self.close();
		});
	}
	
	
	// Initiate
	setView(0);
}

exports.load = function(obj) {
		
	layout(obj);

	return self;
};


// ------------------------------------
// Component builder
//   when used in dual mode
// ------------------------------------
function layoutComponent() {
	// Setup tabbar
	selfView.add(tabbar.init());
	selfView.add(shadow);

	// Setup scrollable view
	wrapper.setViews([currentView.load(), programView.load(), comingView]);
	wrapper.setCurrentPage(0);
	selfView.add(wrapper);

	if(!u.getBool('purchaseMode')) {
		var banner = Titanium.UI.createView({backgroundColor: '#222', height: 50, bottom: 0});
		selfView.add(banner);
		
		banner.addEventListener('click', function() {
			Ti.App.fireEvent('openLoginDialog', {from: 'placeLimited'});
			//self.close();
		});
	}
	
	// Initiate
	setView(0);
}

exports.loadComponent = function() {

	layoutComponent();

	return selfView;
};


// component builder end


function setView(id) {
	if(id === 0) {
		wrapper.scrollToView(0);
	}
}



// ------------------------------------
// EVENTS
// ------------------------------------
self.addEventListener('close', function() {
	// set loaded to
	self.remove(tabbar);
	self.remove(shadow);
});

Ti.App.addEventListener('cinematab_change', function(e) {
	wrapper.scrollToView(e.id);
});


Ti.App.addEventListener('goto:SelectShow', function(e) {
	// var win = Titanium.UI.createWindow({title: 'idiot'});
	// 
	// require('ui/buy/Limited').tab.open(win)
});
