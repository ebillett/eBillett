var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/components/InfoBlock'),
	wrapper = Titanium.UI.createView(styles.wrapper),
	poster = Titanium.UI.createImageView(styles.poster);



exports.loadMovieInfo = function(movie) {

	poster.image = movie.poster;
	wrapper.add(poster);

	return wrapper;
};