var general = require('ui/styles/general'),
	styles = require('ui/styles/tickets/Tickets'),
	u = require('plugins/utils'),
	net = require('services/network'),
	db = require('services/db'),
	user,
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	table = Titanium.UI.createTableView(styles.table);


	self.titleControl = general.defaultTitle('Mine billetter');


var layout = function() {

	self.add(table);


};

exports.load = function() {
	layout();

	user = u.getString('user:info');

	if(user) {
		user = JSON.parse(user);
	} else {
		user = false;
	}

	getPurchases();

	return self;
};



function getPurchases() {
	table.setData([]);

	db.getPurchases(function(purchases) {

		_.each(purchases, function(purchase) {
			purchase.getTickets();

			var row = Titanium.UI.createTableViewRow(styles.row);
			row.title = purchase.title;
			table.appendRow(row);

		});

	});

};

