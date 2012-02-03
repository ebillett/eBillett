var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/show_cinema'),
	Movie = require('models/Movie'),
	self = Titanium.UI.createView(general.wrapper),
	table = Titanium.UI.createTableView({backgroundColor: '#eee'});


function layout() {
	self.backgroundColor = '#ff00ff';
	self.add(table);
}

exports.load = function() {
	layout();

	getMovies();

	return self;
};


function getMovies() {

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
						table.appendRow(testRow);
					}
				});

			} else {
				// ERROR
			}


		});
	}
}
