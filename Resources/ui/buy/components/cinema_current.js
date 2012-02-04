var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/show_cinema'),
	Movie = require('models/Movie'),
	//self = Titanium.UI.createView(),
	//table = Titanium.UI.createTableView({backgroundColor: '#eee', height: 323, top: 43, data: []});
	self = Titanium.UI.createTableView({backgroundColor: '#eee', height: 323, top: 43, data: []});


function layout() {
	self.backgroundColor = '#eee';
	
	//table.setData();

	//self.add(table);
}

exports.load = function() {
	layout();

	getMovies();

	return self;

	//return table;
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

						var testRow = Titanium.UI.createTableViewRow({title: obj.title});
						self.appendRow(testRow);
					}
				});

			} else {
				// ERROR
			}


		});
	}
}
