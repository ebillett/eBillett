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
	posterWrapper = Titanium.UI.createView(styles.posterWrapper),
	poster = Titanium.UI.createImageView(styles.poster),
	title = Titanium.UI.createLabel(styles.title),
	lengthIcon = Titanium.UI.createView(styles.lengthIcon),
	length = Titanium.UI.createLabel(styles.age),
	ageIcon = Titanium.UI.createView(styles.ageIcon),
	age = Titanium.UI.createLabel(styles.age),
	// ---
	loader,
	table = Titanium.UI.createTableView(styles.table),
	tableHeader = Titanium.UI.createView(styles.tableHeader),
	tableHeaderTitle = Titanium.UI.createLabel(styles.tableHeaderTitle);
	
	self.titleControl = general.defaultTitle('Velg forestiling');
	
	
function layout() {
	
	//self.add(InfoBlock.load(movie));

	// Build infoblock
	poster.image = movie.poster;
	posterWrapper.add(poster);
	infoWrapper.add(posterWrapper);

	title.text = movie.title;
	infoWrapper.add(title);

	age.text = movie.age;
	infoWrapper.add(age);
	infoWrapper.add(ageIcon);

	length.text = movie.length;
	length.top = 122;
	infoWrapper.add(length);
	infoWrapper.add(lengthIcon);

	self.add(infoWrapper);


	tableHeader.add(tableHeaderTitle);
	self.add(tableHeader);

	loader = u.loading(25, 'Laster inn...');
	table.add(loader);

	self.add(table);
	//self.add(general.shadowTop(116));
	self.add(general.shadowTop(186));

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

				u.fadeout(loader, function() {
					table.remove(loader);
				});

			} else {
				// ERROR
			}


	});

}


table.addEventListener('click', function(e) {

	if(!u.getBool('purchaseMode')) {

		alert('Du må logge inn for å fortsette');

	} else {

		var win = require('ui/buy/SelectTickets').load(movie, e.rowData.obj);
		require('ui/Tabgroup').tabs.buy.open(win);

	}

});

