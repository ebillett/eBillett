var general = require('ui/styles/general'),
	styles = require('ui/styles/tickets/Tickets'),
	u = require('plugins/utils'),
	net = require('services/network'),
	db = require('services/db'),
	Purchase = require('models/Purchase'),
	user,
	checkedForNew = false;
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	refreshBtn = Titanium.UI.createButton({
		//backgroundImage: 'images/common/icon_loading.png',
		image: 'images/common/icon_loading.png',
		backgroundColor: 'transparent',
		backgroundImage: 'transparent',
		title: '',
		heigth: 23
	}),
	refreshBtnImg = Titanium.UI.createView({
		backgroundImage: 'images/tickets/icon-refresh.png',
		width: 19,
		heigth: 23
	}),
	table = Titanium.UI.createTableView(styles.table);


	self.titleControl = general.defaultTitle('Mine billetter');


var layout = function() {

	self.setLeftNavButton(refreshBtn);

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

	return self;
};



function getPurchases() {
	table.setData([]);

	var data = [];

	db.getPurchases(function(purchases) {
		if(purchases.length !== 0) {
			
			_.each(purchases, function(purchase) {
				purchase.getTickets();

				var row = Titanium.UI.createTableViewRow(styles.row);
				row.title = purchase.title;
				row.obj = purchase;
				//table.appendRow(row);
				data.push(row);

			});

		} else {
			// No stored tickets
			var row = Titanium.UI.createTableViewRow({title: 'Ingen billetter.'});
			table.appendRow(row);
			//tix.push(row);

		}

		table.setData(data, {animated: true});

	});

};


function checkNewPurchases() {
	debug('check new purchases');

	var localPurchases = [];
	db.getPurchases(function(purchases) {
		if(purchases) {
			_.each(purchases, function(purchase) {
				localPurchases.push(purchase.receipt_id);
			});
		}

	});

	// Check for new purchases
	net.tickets.get(user.profil_id, localPurchases, function(responseData) {

		if(responseData) {
					
			if(responseData.status == 'NOK') {
				// Error
				alert(responseData.result.message);	
					
			} else if(responseData.purchases.length !== 0) {

				debug('got new tickets online: ' + responseData.purchases.length);
				
				_.each(responseData.purchases, function(purchase) {

					db.savePurchase(purchase, user.profil_id, function() {
							
						_.each(purchase.tickets, function(ticket) {
							db.saveTicket(ticket, purchase.receipt_id);
						});

					});

					u.generateQrCode(purchase.utref, function(result) {
						if(result) {
							debug('saved code');
						} else {
							debug('did not save, should be marked, so that it can be saved later');
						}
					});

				});

				getPurchases();

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

	
	//getPurchases();
});

refreshBtn.addEventListener('click', function() {

	checkNewPurchases();
	//table.setData([], {animated:true})

	refreshBtn.opacity = 0.5;
	
	var t = Ti.UI.create2DMatrix();
	t = t.rotate(180);

	refreshBtn.animate({
		transform: t,
		duration: 500,
		repeat: 100,
		//curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_IN_OUT
	});

});

table.addEventListener('click', function(e) {

	var win = require('ui/tickets/TicketDetail').load(e.rowData.obj);
	require('ui/Tabgroup').tabs.tickets.open(win);

});