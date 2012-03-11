

function Purchase(o) {
	
	this.id = o.id;
	this.title = o.title;
	this.pid = o.pid;
	this.place = o.place;
	this.receipt_id = o.receipt_id;
	this.utref = o.utref;
	this.fdato = o.fdato;
	this.fkl = o.fkl.substr(0,5);
	this.dato = o.dat;
	this.kl = o.kl;
	this.showroom = o.showroom;

	this.getTickets = function() {
		require('services/db').getTickets(this.receipt_id);
	}

};

module.exports = Purchase;
