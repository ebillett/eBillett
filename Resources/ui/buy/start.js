var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/start'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	app,
	editBtn = Titanium.UI.createButton({title: 'Rediger'});




var layout = function() {



	if (app.state == 'limited') {

		debug('limited mode, loading full places list');
		self.titleControl = general.defaultTitle('Velg sted');

		var content = require('ui/buy/places_nologin').load();
		self.add(content);

	} else if (app.state == 'normal') {

		debug('normal mode, loading user based list');
		self.titleControl = general.defaultTitle('Mine steder');

	} else {

		alert('En feil har oppstått. Vennligst start applikasjonen på nytt. Beklager! :-/');

	}

};


exports.load = function(exports) {
	app = exports;

	layout();


	return self;

};