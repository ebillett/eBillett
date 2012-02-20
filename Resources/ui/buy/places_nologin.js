var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/places_nologin'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	editing = false,
	wrapper = Titanium.UI.createView(general.wrapper),
	infoWrapper = Titanium.UI.createView(styles.infoWrapper),
	table = Titanium.UI.createTableView(styles.table);


	self.titleControl = general.defaultTitle('Velg sted');


function layout() {
		
	self.add(infoWrapper);
	self.add(table);

	//table.search = search;

}


exports.load = function() {
	
	return self;

};


