function Show(obj) {
	
	this.date = obj.date;
	this.datenbr = obj.datenbr;
	this.showtime = obj.showtime;
	this.showend = obj.showend;
	this.room = obj.showroom;
	this.id = obj.showid;


	this.tickets = obj.tickets;

	this.getDate = function() {
		var date = Date.parse(this.date);

		date.toString('dddd DD mmmm');

		return date;
	}

	this.getTime = function() {
		var time = Date.parse(this.showtime);

		time.toString('h:mm');

		return time;
	}



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