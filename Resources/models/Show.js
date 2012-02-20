function Show(obj) {
	
	this.date = obj.date;
	this.datenbr = obj.datenbr;
	this.showtime = obj.showtime;
	this.showend = obj.showend;
	this.showrooom = obj.showroom;

	this.tickets = obj.tickets;

	// debug('Setting up model for show with time: ' + this.showtime);

	// _.each(obj.tickets, function(ticket) {
	// 	//ticket = ticket.ticket;

	// 	debug('looping ticket categories');
	// 	debug(ticket);

	// 	debug(ticket.name);

	// 	tickets.push({
	// 		name: ticket.name,
	// 		id: ticket.id,
	// 		price: ticket.price*1
	// 	});
	// });

}

module.exports = Show;