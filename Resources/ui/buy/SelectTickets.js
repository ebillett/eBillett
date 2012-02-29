var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/SelectTickets'),
	u = require('plugins/utils'),
	net = require('services/network'),
	movie,
	place,
	show,
	self = Titanium.UI.createWindow(general.defaultWindow),
	// Infoblock
	infoWrapper = Titanium.UI.createView(styles.infoWrapper),
	poster = Titanium.UI.createImageView(styles.poster),
	// ---
	table = Titanium.UI.createTableView(styles.table),
	tableHeader = Titanium.UI.createView(styles.tableHeader),
	tableHeaderTitle = Titanium.UI.createLabel(styles.tableHeaderTitle),
	totalAmt = 0;
	totalLabel = Titanium.UI.createLabel(styles.totalLabel);

	self.titleControl = general.defaultTitle('Velg antall');
	self.tabBarHidden = true;


function layout() {

	//self.add(InfoBlock.load2(movie));
	// Build infoblock
	poster.image = movie.poster;
	infoWrapper.add(poster);
	self.add(infoWrapper);

	tableHeader.add(tableHeaderTitle);
	self.add(tableHeader);

	self.add(general.shadowTop(156));

	self.add(table);

	self.add(totalLabel);

	createTicketRows();

}

exports.load = function(mv, sw) {

	place = JSON.parse(u.getString('place'));
	movie = mv;
	show = sw;


	layout();

	return self;

};


function createTicketRows() {
	table.setData([]);

	var tableData = [];

	alert(_.size(show.tickets));

	_.each(show.tickets, function(ticket) {

		var row = Titanium.UI.createTableViewRow(styles.row);
		
		var catTitle = Titanium.UI.createLabel(styles.catTitle);
		catTitle.text = ticket.name;
		row.add(catTitle);

		var catPrice = Titanium.UI.createLabel(styles.catPrice);
		catPrice.text = ticket.price + ',-';
		row.add(catPrice);

		var catAmt = Titanium.UI.createLabel(styles.catAmt);
		catAmt.text = 0;
		row.add(catAmt);


		// Buttons
		var addBtn = Titanium.UI.createButton(styles.addBtn);
		row.add(addBtn);

		var subBtn = Titanium.UI.createButton(styles.subBtn);
		row.add(subBtn);

		addBtn.addEventListener('click', function() {
			updateTotal(true, ticket.price);
		});

		subBtn.addEventListener('click', function() {
			updateTotal(false, ticket.price);
		});


		tableData.push(row);

	});

	table.setData(tableData);

}


function updateTotal(op, price) {

	if(op) {

		// Add
		totalAmt = totalAmt + price*1;
		totalLabel.text = totalAmt;

	} else {

		// Subtract
		totalAmt = totalAmt - price*1;
		totalLabel.text = totalAmt;

	}

}