var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/SelectShow'),
	u = require('plugins/utils'),
	net = require('services/network'),
	movie,
	place,
	show,
	self = Titanium.UI.createWindow(general.defaultWindow);

	self.titleControl = general.defaultTitle('Velg antall');


function layout() {



}

exports.load = function(mv, sw) {

	place = JSON.parse(u.getString('place'));
	movie = mv;
	show = sw;

	alert(movie.title + ' / ' + show.room);

	layout();

	return self;

};