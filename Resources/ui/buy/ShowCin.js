var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/ShowCinema'),
	u = require('plugins/utils'),
	place,
	self = Titanium.UI.createWindow(general.defaultWindow),
	selfView = Titanium.UI.createView(),
	shadow = general.shadowTop(43);
	//tabbar = require('ui/buy/components/TabBar');


exports.load = function() {
	

	return self;
}