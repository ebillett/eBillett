var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/ShowCulture'),
	u = require('plugins/utils'),
	place,
	self = Titanium.UI.createWindow(general.defaultWindow),
	selfView = Titanium.UI.createView(),
	shadow = general.shadowTop(0),
	table = Titanium.UI.createTableView(styles.table);



function layout() {

	self.titleControl = general.defaultTitle(place.name);

	self.add(table);

};


exports.load = function() {

	place = JSON.parse(u.getString('place'));

	layout();

	return self;

}


function layoutComponent() {
	
	selfView.add(table);

};

exports.loadComponent = function() {

	layoutComponent();

	return self;

}