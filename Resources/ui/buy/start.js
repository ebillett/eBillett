var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/start'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	editBtn = Titanium.UI.createButton({title: 'Rediger'});




var layout = function() {

	//alert(app.state);

	// if (app.state == 'limited') {

	// 	debug('limited mode, loading full places list');
	// 	self.backgroundColor = '#ff0000';

	// } else if (app.state == 'normal') {

	// 	debug('normal mode, loading user based list');

	// } else {

	// 	alert('En feil har oppstått. Vennligst start applikasjonen på nytt. Beklager! :-/');

	// }

};


exports.load = function() {



	layout();

		//debug(app.test);

	return self;

};