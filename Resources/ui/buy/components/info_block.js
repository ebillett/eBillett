var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/components/info_block'),
	movie,
	//self = Titanium.UI.createView(),
	//table = Titanium.UI.createTableView({backgroundColor: '#eee', height: 323, top: 43, data: []});
	self = Titanium.UI.createView(styles.wrapper),
	poster = Titanium.UI.createImageView(styles.poster);

function layout() {
	
	poster.image = movie.poster;
	self.add(poster);

}

exports.load = function(obj) {
	movie = obj;


	layout();

	return self;

};