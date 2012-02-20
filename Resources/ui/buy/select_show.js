var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/select_show'),
	Show = require('models/Show'),
	movie,
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	infoBlock = require('ui/buy/components/info_block'),
	table = Titanium.UI.createTableView(styles.table),
	tableHeader = Titanium.UI.createView(styles.tableHeader),
	tableHeaderTitle = Titanium.UI.createLabel(styles.tableHeaderTitle);


	self.titleControl = general.defaultTitle('Velg forestilling');


function layout() {
	
	self.add(infoBlock.load(movie));

	tableHeader.add(tableHeaderTitle);
	self.add(tableHeader);

	self.add(table);
	self.add(general.shadowTop(116));
	self.add(general.shadowTop(142));

}


exports.load = function(obj) {
	movie = obj;

	layout();

	getShows(movie);

	return self;

};


function getShows(movie) {

	table.setData([]);

	var tableData = [];
	
	app.net.cinema.getShows(app.prop.place.pid, movie.id, function(resultData) {
			if(resultData) {
				var shows = resultData.result.shows;

				_.each(shows, function(show) {
					show = show.show;

					var obj = new Show(show);

					debug('creating row for show with date ' + obj.date);

					var row = Titanium.UI.createTableViewRow(styles.row);
					row.backgroundColor = '#ff0000';
					row.show = obj;

					var title = Titanium.UI.createLabel(styles.rowTitle);
					title.text = obj.datenbr;
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
		// FYR igang
	}

});