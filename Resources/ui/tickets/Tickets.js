var general = require('ui/styles/general'),
	styles = require('ui/styles/tickets/Tickets'),
	u = require('plugins/utils'),
	net = require('services/network'),
	db = require('services/db'),
	user,
	checkedForNew = false,
	changedUser = false,
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

	debug('changed user: ' + changedUser);

	//getPurchases();


	return self;
};



function getPurchases() {
	table.setData([]);

	db.getPurchases(user.profil_id, function(purchases) {
		if(purchases.length !== 0) {

			var data = [];
			
			_.each(purchases, function(purchase) {

				var tickLen = purchase.getTickets();
				tickLen = tickLen.length;

				var row = Titanium.UI.createTableViewRow(styles.row);
				//row.title = purchase.title;
				
				var tPlace = Titanium.UI.createLabel(styles.tPlace);
				tPlace.text = purchase.place;
				row.add(tPlace);

				var tTitle = Titanium.UI.createLabel(styles.tTitle);
				tTitle.text = purchase.title;
				row.add(tTitle);

				var date = Date.parse(purchase.fdato);

				var tTime = Titanium.UI.createLabel(styles.tTime);
				tTime.text = purchase.fkl + '   ' + date.toString('ddd dd. MMMM');
				row.add(tTime);

				if(tickLen == 2) {
					row.backgroundImage = 'images/tickets/table_ticket2.png';
				} else if (tickLen > 2) {
					row.backgroundImage = 'images/tickets/table_ticket3.png';
				}


				row.obj = purchase;
				//table.appendRow(row);

				data.push(row);

			});

			table.setData(data, {animated: true});

		} else {
			// No stored tickets
			var row = Titanium.UI.createTableViewRow({title: 'Ingen billetter.'});
			table.appendRow(row);

		}

	});

};


function checkNewPurchases() {
	debug('check new purchases');

	infoPop.build();

	var localPurchases = [];
	var newTickets = false;
	db.getPurchases(user.profil_id, function(purchases) {

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

				// Save purchases and tickets
				_.each(responseData.purchases, function(purchase) {
					savePurchase(purchase);
				});

				newTickets = true;

				infoPop.change('Fant ' + responseData.purchases.length + ' nye kjøp.');

			} else if(responseData.purchases.length === 0) {

				debug('no new tickets');

				newTickets = false;

				getPurchases();

				infoPop.change(null);

			} else {

				//error
				debug('error');
				infoPop.change('Ikke kontakt med server. Prøv igjen.');

			}

			if(newTickets) {
				Ti.App.fireEvent('tickets:new');
			}

		} else {

			debug('error');

		}

	});

}

function savePurchase(purchase) {

	debug('saving purchase: ' + purchase.tittel + ' / ' + purchase.fdato);

	

	db.savePurchase(purchase, user.profil_id, function() {

		_.each(purchase.tickets, function(ticket) {

			debug('saving ticket');

			db.saveTicket(ticket, purchase.receipt_id);
		});

		u.generateQrCode(purchase.utref, function(result) {
			if(result) {
				debug('saved code');
			} else {
				debug('did not save, should be marked, so that it can be saved later');
			}
		});

	});

}

var infoPop = {
	instance: Titanium.UI.createView({
		backgroundColor: '#000',
		opacity: 0,
		borderRadius: 6,	
		width: 200,
		height: 100,
		zIndex: 500
	}),
	label: Titanium.UI.createLabel({
		text: 'Sjekker billetter...',
		width: 'auto',
		height: 'auto',
		font: {
			fontSize: 16,
			fontWeight: 'bold'
		},
		color: '#fff',
		shadowColor: '#000',
		shadowOffset: {x: 0, y: 1}
	}),
	build: function() {
		var that = this;

		this.instance.add(this.label);

		self.add(this.instance)
		this.instance.animate({
			opacity: 0.8,
			duration: 200
		}, function() {
			that.instance.opacity = 0.8;
		});
		
	},
	change: function(txt) {
		if(txt) {
			this.label.text = txt;
		}

		this.fade();
	},
	fade: function() {
		var that = this;
		setTimeout(function() {
			that.instance.animate({
				opacity: 0,
				duration: 600
			}, function() {
				self.remove(that.instance);
				that.label.text = 'Sjekker billetter...';
			});
		}, 1200);
	}
}


self.addEventListener('focus', function() {
	user = u.getString('user:info');
	user = JSON.parse(user);

	if(!checkedForNew || changedUser) {
		checkNewPurchases();

		if(!checkedForNew) {
			checkedForNew = true;
		}

		if(changedUser) {
			changedUser = false;
		}
	}

	// Update userinfo in case of user switch
	//user = u.getString('user:info');

});

refreshBtn.addEventListener('click', function() {

	checkNewPurchases();

	refreshBtn.opacity = 0.5;
	
	var t = Ti.UI.create2DMatrix();
	t = t.rotate(180);

	refreshBtn.animate({
		transform: t,
		duration: 500,
		repeat: 2,
		//curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_IN_OUT
	});

});

table.addEventListener('click', function(e) {

	var win = require('ui/tickets/TicketDetail').load(e.rowData.obj);
	require('ui/Tabgroup').tabs.tickets.open(win);

});

Ti.App.addEventListener('tickets:new', function() {
	getPurchases();
});

Ti.App.addEventListener('tickets:check', function() {
	checkNewPurchases();
})

Ti.App.addEventListener('loginwin.close', function() {
	changedUser = true;
	debug('changed user: ' + changedUser);
});