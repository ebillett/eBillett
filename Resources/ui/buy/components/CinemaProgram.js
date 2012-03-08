var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/components/CinemaProgram'),
	u = require('plugins/utils'),
	net = require('services/network'),
	place,
	hadLoaded = false,

	self = Titanium.UI.createTableView(styles.table);



function layout() {

	var testRow = Titanium.UI.createTableViewRow({title: place.name});
	self.appendRow(testRow);

	var test = {
		
	}

};

exports.load = function() {

	place = JSON.parse(u.getString('place'));

	layout();

	return self;

}



// Put in ti.app. event listener for tabchange with correct id
exports.getShows = function() {

	if(!hasLoaded) {



		hasLoaded = true;

	};

};