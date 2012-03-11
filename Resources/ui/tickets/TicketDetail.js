var general = require('ui/styles/general'),
	styles = require('ui/styles/tickets/TicketDetail'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(styles.wrapper),
	ticket,
	tPlace = Titanium.UI.createLabel(styles.tPlace),
	tTitle = Titanium.UI.createLabel(styles.tTitle),
	tTime = Titanium.UI.createLabel(styles.tTime),
	tDate = Titanium.UI.createLabel(styles.tTime),
	tRoom = Titanium.UI.createLabel(styles.tRoom),
	codeBtn = Titanium.UI.createButton(styles.codeBtn),
	codeBtnLabel = Titanium.UI.createLabel(styles.codeBtnLabel),
	cover = Titanium.UI.createView(styles.cover),
	ticketImg = Titanium.UI.createView(styles.ticketImg);


function layout() {

	self.titleControl = general.defaultTitle(ticket.title);

	tPlace.text = ticket.place;
	wrapper.add(tPlace);

	tTitle.text = ticket.title;
	wrapper.add(tTitle);

	tTime.text = ticket.fkl + '    ' + ticket.fdato;
	wrapper.add(tTime);

	tRoom.text = ticket.showroom;
	wrapper.add(tRoom);



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
		self.add(cover);

		cover.animate({
			opacity: 0.8,
			duration: 200,
		}, function() {
			cover.opacity = 0.8;
			ticketImg.animate({
				opacity: 1,
				duration: 200
			}, function() {
				ticketImg.opacity = 1;
			});
		});
	} else {
		// Hide ticket
		

	}

}

codeBtn.addEventListener('click', function() {

	showHideTicket(true);

});

cover.addEventListener('click', function() {
	
	showHideTicket(false);

});