var general = require('ui/styles/general'),
	styles = require('ui/styles/tickets/TicketDetail'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(styles.wrapper),
	ticket,
	tPlace = Titanium.UI.createLabel(styles.tPlace),
	tTitle = Titanium.UI.createLabel(styles.tTitle),
	tTime = Titanium.UI.createLabel(styles.tTime),
	tDate = Titanium.UI.createLabel(styles.tDate),
	tRoom = Titanium.UI.createLabel(styles.tRoom),
	table = Titanium.UI.createTableView(styles.table),
	tPurch = Titanium.UI.createLabel(styles.tPurch),
	shareBtn = Titanium.UI.createButton(styles.shareBtn),
	shareBtnLabel = Titanium.UI.createLabel(styles.shareBtnLabel),
	codeBtn = Titanium.UI.createButton(styles.codeBtn),
	codeBtnLabel = Titanium.UI.createLabel(styles.codeBtnLabel),
	cover = Titanium.UI.createView(styles.cover),
	ticketImg = Titanium.UI.createView(styles.ticketImg);


function layout() {

	self.titleControl = general.defaultTitle(ticket.title);

	tPlace.text = ticket.place;
	wrapper.add(tPlace);

	var date = Date.parse(ticket.fdato);

	tDate.text = date.toString('ddd dd. MMMM');
	wrapper.add(tDate);

	tTitle.text = ticket.title;
	wrapper.add(tTitle);

	tTime.text = ticket.fkl;
	wrapper.add(tTime);

	tRoom.text = ticket.showroom;
	wrapper.add(tRoom);

	wrapper.add(table);

	var purchaseDate = ticket.dato + ' ' + ticket.kl;

	purchaseDate = Date.parse(purchaseDate);
	tPurch.text = 'Kjøpt ' +  purchaseDate.toString('dd/MM-yy') + ' kl.: ' + purchaseDate.toString('hh:mm');
	wrapper.add(tPurch);

	shareBtn.add(shareBtnLabel);
	wrapper.add(shareBtn);



	codeBtn.add(codeBtnLabel);
	wrapper.add(codeBtn);

	self.add(wrapper);

};


exports.load = function(obj) {

	ticket = obj;

	layout();

	return self;
};

function showHideTicket(what) {

	if(what) {
		// Show ticket
		self.add(ticketImg);
		ticketImg.zIndex = 600;

		self.add(cover);
		ticketImg.zIndex = 500;


		cover.animate({
			opacity: 0.8,
			duration: 200
		}, function() {
			cover.opacity = 0.8;
		});

		ticketImg.animate({
			opacity: 1,
			duration: 200
		}, function() {
			ticketImg.opacity = 1;
		});

	} else {
		// Hide ticket
		//
		//

		cover.animate({
			opacity: 0,
			duration: 200
		}, function() {
			cover.opacity = 0;
			self.remove(cover);
		});

		ticketImg.animate({
			opacity: 0,
			duration: 200
		}, function() {
			ticketImg.opacity = 0;
			self.remove(ticketImg);
		});


	}

}

codeBtn.addEventListener('click', function() {

	showHideTicket(true);

});

cover.addEventListener('click', function() {
	
	showHideTicket(false);

});

self.addEventListener('close', function() {
	
	self.remove(ticketImg);
	ticketImg.zIndex = 600;

	self.remove(cover);
	cover.zIndex = 500;

});