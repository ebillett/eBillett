var general = require('ui/styles/general'),
	styles = require('ui/styles/tickets/TicketDetail'),
	u = require('plugins/utils'),
	social = require('services/social'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	container = Titanium.UI.createView(),
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
	qrWrapper = Titanium.UI.createView(styles.qrWrapper),
	qrImg = Titanium.UI.createImageView(styles.qrImg),
	cover = Titanium.UI.createView(styles.cover),
	ticketImg = Titanium.UI.createView(styles.ticketImg),
	expiredBanner = Titanium.UI.createView(styles.expiredBanner),
	expiredTicket = false;


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
	table.setData([{title: '1 x Voksen    Rad 11, sete 12'}]);

	var purchaseDate = ticket.dato + ' ' + ticket.kl;

	purchaseDate = Date.parse(purchaseDate);
	tPurch.text = 'Kjøpt ' +  purchaseDate.toString('dd/MM-yy') + ' kl.: ' + purchaseDate.toString('hh:mm');
	wrapper.add(tPurch);

	shareBtn.add(shareBtnLabel);
	wrapper.add(shareBtn);

	// Add qr code
	var filename = 'ticket_' + ticket.utref + '.png';
	qrImg.image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
	qrWrapper.add(qrImg);


	codeBtn.add(codeBtnLabel);
	wrapper.add(codeBtn);


	// Check if ticket has expired
	if(ticket.expired) {
		wrapper.add(cover);
		self.add(expiredBanner);

		expiredTicket = true;
	}



	container.add(wrapper);

	self.add(container);

};


exports.load = function(obj) {

	ticket = obj;

	layout();

	return self;
};


codeBtn.addEventListener('click', function() {

	//showHideTicket(true);

	container.animate({
		view: qrWrapper,
		transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
		//transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
	});

});

qrWrapper.addEventListener('click', function() {
	container.animate({
		view: wrapper,
		transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		//transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
	});	
});


var fb = {
	ui: {
		cover: Titanium.UI.createView({backgroundColor: '#000', opacity: 0.8}),
		wrapper: Titanium.UI.createView({backgroundColor: '#f0f0f0', width: 250, height: 150}),
		fbBtn: Ti.Facebook.createLoginButton({bottom: 50, style : Ti.Facebook.BUTTON_STYLE_WIDE})
	},
	loginView: function() {
		var that = this;

		this.ui.wrapper.add(this.ui.fbBtn);

		self.add(this.ui.cover);
		self.add(this.ui.wrapper);

		this.ui.cover.addEventListener('click', function() {
			self.remove(that.ui.cover);
			self.remove(that.ui.wrapper);
		});

		Titanium.Facebook.addEventListener('login', function(e) {
		    if (e.success) {
		        that.loginSuccess();
		    } else if (e.error) {
		        debug(e.error);
		    } else if (e.cancelled) {
		        debug("Cancelled");
		    }
		});
	},
	loginSuccess: function() {
		var that = this;

		this.ui.wrapper.animate({
			opacity: 0,
			duration: 200
		}, function() {
			self.remove(that.ui.wrapper);
		});

		this.ui.cover.animate({
			opacity: 0,
			duration: 200
		}, function() {
			self.remove(that.ui.cover);
		});

		social.postToWall(ticket);
	},
	cancelLogin: function() {
		var that = this;

		this.ui.wrapper.animate({
			opacity: 0,
			duration: 200
		}, function() {
			self.remove(that.ui.wrapper);
		});

		this.ui.cover.animate({
			opacity: 0,
			duration: 200
		}, function() {
			self.remove(that.ui.cover);
		});
	}
}


shareBtn.addEventListener('click', function() {

	if(social.checkAuth()) {
		social.postToWall(ticket);
	} else {
		fb.loginView();
	}

});

self.addEventListener('close', function() {
	if(expiredTicket) {
		wrapper.remove(cover);
		self.remove(expiredBanner);

		expiredTicket = false;
	}
});

Ti.App.addEventListener('fb:postSuccess', function() {

	var popup = u.infoPop('Fullført!');

	self.add(popup);

	setTimeout(function() {
		popup.animate({
			duration: 500,
			opacity: 0
		}, function() {
			self.remove(popup);
		})
	}, 2000);

});

Ti.App.addEventListener('loginwin.close', function() {
	self.close();
});