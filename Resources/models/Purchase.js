

function Purchase(o) {
	
	this.id = o.id;
	this.title = o.title;
	this.pid = o.pid;
	this.place = o.place;
	this.receipt_id = o.receipt_id;
	this.utref = o.utref;
	this.fdato = o.fdato;
	this.fkl = o.fkl.substr(0,5);
	this.dato = o.dato;
	this.kl = o.kl;
	this.showroom = o.showroom;


	this.getTickets = function() {
		require('services/db').getTickets(this.receipt_id);
	}

	this.isExpired = function(fdate) {
		var limit = new Date;
		limit.add(1).days().add(12).hours();

		if(fdate.isAfter(limit)) {
			// Not expired
			return false;
		} else {
			// Expired
			return true;
		}
	}

	this.fullDate = Date.parse(this.fdato + ' ' + this.fkl);
	this.expired = this.isExpired(this.fullDate);

};

module.exports = Purchase;
