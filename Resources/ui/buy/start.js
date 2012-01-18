var general = require('ui/styles/general'),
	styles,
	self = Titanium.UI.createWindow(general.defaultWindow),
	test = Titanium.UI.createView({height: 30, backgroundImage: 'images/common/bg.png', backgroundColor: '#ff00ff'});


	self.titleControl = general.defaultTitle('Hei idiot');


var layout = function() {
	self.add(test);
};

exports.load = function() {
	layout();

	return self;
};