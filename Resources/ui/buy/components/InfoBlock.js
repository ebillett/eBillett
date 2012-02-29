var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/components/InfoBlock'),
	wrapper = Titanium.UI.createView(styles.wrapper),
	wrapper2 = Titanium.UI.createView(styles.wrapper),
	poster = Titanium.UI.createImageView(styles.poster);
	poster2 = Titanium.UI.createImageView(styles.poster);



exports.load = function(movie) {

	poster.image = movie.poster;
	wrapper.add(poster);

	return wrapper;
};

// Dirty hack 
exports.load2 = function(movie) {

	poster2.image = movie.poster;
	wrapper2.add(poster2);

	return wrapper;
};