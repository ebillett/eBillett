var general = require('ui/styles/general'),
	styles = require('ui/styles/tickets/Tickets'),
	u = require('plugins/utils'),
	net = require('services/network'),
	db = require('services/db'),
	user,
	checkedForNew = false;
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	refreshBtn = Titanium.UI.createButton({
		//backgroundImage: 'images/common/icon_loading.png',
		image: 'images/common/icon_loading.png',
		backgroundColor: 'transparent',
		backgroundImage: 'transparent',
		title: 'X'
	});
	table = Titanium.UI.createTableView(styles.table);


	self.titleControl = general.defaultTitle('Mine billetter');


var layout = function() {

	self.setRightNavButton(refreshBtn);

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


function checkNewPurchases() {
	debug('check new purchases');

	var localPurchases = [];
	db.getPurchases(function(purchases) {

		_.each(purchases, function(purchase) {
			localPurchases.push(purchase.receipt_id);
		});

	});

	// Check for new purchases
	net.tickets.get(user.profil_id, localPurchases, function(responseData) {

		if(responseData) {
					
			if(responseData.status == 'NOK') {
				// Error
				alert(responseData.result.message);	
					
			} else if(responseData.purchases.length !== 0) {

				debug('got new tickets online: ')
				debug(JSON.stringify(responseData));

			} else if(responseData.purchases.length === 0) {

				debug('no new tickets');

			} else {

				//error
				debug('error');

			}



		} else {

			debug('error');

		}

	});

}


self.addEventListener('focus', function() {
	if(!checkedForNew) {
		checkNewPurchases();
		checkedForNew = true;
	}
});
