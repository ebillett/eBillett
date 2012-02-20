var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/components/cinema_current'),
	Movie = require('models/Movie'),
	//self = Titanium.UI.createView(),
	//table = Titanium.UI.createTableView({backgroundColor: '#eee', height: 323, top: 43, data: []});
	self = Titanium.UI.createTableView(styles.table);


function layout() {
	self.backgroundColor = '#eee';
	
	self.setData();

	//self.add(table);
}

exports.load = function() {
	layout();

	getMovies();

	return self;

};


function getMovies() {
	debug('cinema loaded current: ' + app.prop.cinemaLoaded.current);

	if(!app.prop.cinemaLoaded.current) {
		var test = [];

		app.net.cinema.getCurrent(app.prop.place.pid, function(resultData) {
			if(resultData) {
				var movies = resultData.result.movies;

				_.each(movies, function(movie) {
					movie = movie.movie;
					
					if(movie.title) {
						// Luk ut ghosts
						var obj = new Movie(movie);

						var row = Titanium.UI.createTableViewRow(styles.row);

						var poster = Titanium.UI.createImageView(styles.poster);
						poster.url = movie.poster;
						row.add(poster);

						var title = Titanium.UI.createLabel(styles.title);
						title.text = movie.title;
						row.add(title);

						self.appendRow(row);
						
					}
				});

			} else {
				// ERROR
			}


		});
	}
}
