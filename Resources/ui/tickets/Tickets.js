var general = require('ui/styles/general'),
	styles = require('ui/styles/tickets/Tickets'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	table = Titanium.UI.createView(styles.table);


	self.titleControl = general.defaultTitle('Mine billetter');


var layout = function() {

	self.add(table);

	buildRow();

};

exports.load = function() {
	layout();

	return self;
};



// test function
function buildRow() {

	var row = Titanium.UI.createTableViewRow(styles.row);

	//table.appendRow(row);

}