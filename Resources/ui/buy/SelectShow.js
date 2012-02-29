var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/SelectShow'),
	u = require('plugins/utils'),
	net = require('services/network'),
	Show = require('models/Show'),
	movie,
	place,
	self = Titanium.UI.createWindow(general.defaultWindow),
	// Infoblock
	infoWrapper = Titanium.UI.createView(styles.infoWrapper),
	poster = Titanium.UI.createImageView(styles.poster),
	// ---
	table = Titanium.UI.createTableView(styles.table),
	tableHeader = Titanium.UI.createView(styles.tableHeader),
	tableHeaderTitle = Titanium.UI.createLabel(styles.tableHeaderTitle);
	
	self.titleControl = general.defaultTitle('Velg forestiling');
	
	
function layout() {
	
	//self.add(InfoBlock.load(movie));

	// Build infoblock
	poster.image = movie.poster;
	infoWrapper.add(poster);
	self.add(infoWrapper);

	tableHeader.add(tableHeaderTitle);
	self.add(tableHeader);

	self.add(table);
	//self.add(general.shadowTop(116));
	self.add(general.shadowTop(156));

}


exports.load = function(obj) {
	movie = obj;
	place = JSON.parse(u.getString('place'));

	layout();
	
	getShows(movie, place);
	
	return self;

};


function getShows(movie, place) {
	debug(movie.id + ' / ' + place.pid);

	table.setData([]);

	var tableData = [];
	
	net.cinema.getShows(place.pid, movie.id, function(resultData) {
			if(resultData) {
				var shows = resultData.result.shows;
				
				_.each(shows, function(show) {
					show = show.show;

					var obj = new Show(show);


					//debug('creating row for show with date ' + obj.date);

					//var date = Date.parse(obj.date);

					var row = Titanium.UI.createTableViewRow(styles.row);
					row.obj = obj;
					row.backgroundColor = '#ff0000';

					var title = Titanium.UI.createLabel(styles.rowTitle);
					title.text = obj.date;
					//title.text = date.toString('dddd dd MMMM');

					row.add(title);

					tableData.push(row);
					
				});

				table.setData(tableData);

			} else {
				// ERROR
			}


	});

}


table.addEventListener('click', function(e) {
	
	if(app.state == 'limited') {

		alert('Du må logge inn for å fortsette');

	} else {

		var win = require('ui/buy/SelectTickets').load(movie, e.rowData.obj);
		require('ui/Tabgroup').tabs.buy.open(win);

	}

});

