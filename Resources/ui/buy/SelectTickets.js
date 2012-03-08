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
	bottomWrapper = Titanium.UI.createView(styles.bottomWrapper),
	totalAmt = 0;
	totalLabel = Titanium.UI.createLabel(styles.totalLabel),
	continueButton = Titanium.UI.createButton(styles.continueButton);

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

	totalLabel.text = null;
	bottomWrapper.add(totalLabel);
	bottomWrapper.add(continueButton);
	self.add(bottomWrapper);

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

	_.each(show.tickets, function(ticket) {

		var row = Titanium.UI.createTableViewRow(styles.row);

		var ticketCount = 0;
		
		var catTitle = Titanium.UI.createLabel(styles.catTitle);
		catTitle.text = ticket.name;
		row.add(catTitle);

		var catPrice = Titanium.UI.createLabel(styles.catPrice);
		catPrice.text = ticket.price + ',-';
		row.add(catPrice);

		var catAmt = Titanium.UI.createLabel(styles.catAmt);
		catAmt.text = ticketCount;
		row.add(catAmt);

		row.i = {
			name: ticket.name,
			id: ticket.id,
			price: ticket.price,
			count: ticketCount
		};

		// Buttons
		var addBtn = Titanium.UI.createButton(styles.addBtn);
		row.add(addBtn);

		var subBtn = Titanium.UI.createButton(styles.subBtn);
		row.add(subBtn);

		addBtn.addEventListener('click', function() {
			// Update category count label
			ticketCount++;
			catAmt.text = ticketCount;

			row.i = {
				name: ticket.name,
				id: ticket.id,
				price: ticket.price,
				count: ticketCount
			};

			updateTotal(true, ticket.price);

			debug(ticket.name + ': ' + row.i.count);
		});

		subBtn.addEventListener('click', function() {
			if(ticketCount != 0) {

				// Update category count label
				ticketCount--;
				row.i.count = ticketCount;
				catAmt.text = ticketCount;

				updateTotal(false, ticket.price);
				
			}
		});


		tableData.push(row);

	});

	table.setData(tableData);

}


function updateTotal(op, price) {

	if(op) {

		// Add
		totalAmt = totalAmt + price*1;
		totalLabel.text = totalAmt + ',-';

	} else {

		// Subtract
		totalAmt = totalAmt - price*1;
		if(totalAmt === 0) {
			totalLabel.text = null;
			return;	
		}

		totalLabel.text = totalAmt + ',-';

	}

}


continueButton.addEventListener('click', function() {
	var cats = table.data[0].rows,
		selectedTickets = [];

	_.each(cats, function(cat) {

		var o = cat.i;

		if(o.count !== 0 || !o.count) {
			selectedTickets.push(o);
		}

	});

	_.each(selectedTickets, function(a) {
		debug(a.name + '/' + a.count);
	})

});