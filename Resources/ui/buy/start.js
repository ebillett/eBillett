var general = require('ui/styles/general'),
	styles,
	self = Titanium.UI.createWindow(general.defaultWindow);


	self.titleControl = general.defaultTitle('Hei idiot');


var layout = function() {

};

exports.load = function() {
	layout();

	return self;
};

self.addEventListener('focus', function() {
	if(app.state) {
		debug('buy window has focus');
	}
});