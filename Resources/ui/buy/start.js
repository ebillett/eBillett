
var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/Start'),
	u = require('plugins/utils'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	PlacesNoLoginWin = Titanium.UI.createView({backgroundColor: '#000'}),
	PlacesWin = Titanium.UI.createView({backgroundColor: '#ff00ff'});
	

var layout = function() {
	
	
}


exports.load = function() {
	
	layout();
	
	wrapper.add(PlacesWin);
	self.add(wrapper);
	
	
	return self;
	
}

Ti.App.addEventListener('loginwin.close', function() {
	
	layout();
	
});