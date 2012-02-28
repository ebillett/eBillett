var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/components/CinemaCurrent'),
	u = require('plugins/utils'),
	net = require('services/network'),
	Movie = require('models/Movie'),
	place,
	loader,
	//self = Titanium.UI.createView(),
	//table = Titanium.UI.createTableView({backgroundColor: '#eee', height: 323, top: 43, data: []});
	self = Titanium.UI.createTableView(styles.table);


function layout() {
	loader = u.loading();
	self.add(loader);
	
	self.setData();

	//self.add(table);
}

exports.load = function() {
	layout();

	place = JSON.parse(u.getString('place'));

	getMovies(place);

	return self;

};


function getMovies(place) {

	var hasLoaded = u.getBool('cinemaCurrentLoaded')
	
	debug('cinema loaded current: ' + hasLoaded);
	
	self.setData();

	//if(!hasLoaded) {
	if(1+1==2) {
		var test = [];

		net.cinema.getCurrent(place.pid, function(resultData) {
			if(resultData) {
				var movies = resultData.result.movies;

				_.each(movies, function(movie) {
					movie = movie.movie;
					
					if(movie.title) {
						// Luk ut ghosts
						var obj = new Movie(movie);

						var row = Titanium.UI.createTableViewRow(styles.row);
						row.movie = obj;

						var poster = Titanium.UI.createImageView(styles.poster);
						poster.image = obj.poster;
						row.add(poster);

						var title = Titanium.UI.createLabel(styles.title);
						title.text = obj.title;
						row.add(title);

						self.appendRow(row);
						
					}
				});

			} else {
				var row = Titanium.UI.createTableViewRow({title: 'Får ikke kontakt med server. Gå tilbake og prøv igjen. Beklager.'});
				self.appendRow(row);
			}
			
			u.fadeout(loader, function() {
				self.remove(loader);
			});
			
		});
	}
}


// ------------------------------------
// Events
// ------------------------------------

self.addEventListener('click', function(e) {
	
	var win = require('ui/buy/SelectShow').load(e.rowData.movie);
	
	debug('clicked on ' + e.rowData.movie.title);
	debug('in purchase mode? ' + u.getBool('purchaseMode'));
	
	// Open in correct context based on mode
	u.getBool('purchaseMode') ? debug('true') : require('ui/buy/Limited').tab.open(win);
	
});

