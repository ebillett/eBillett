var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/show_cinema'),
	self = Titanium.UI.createView(general.wrapper);


function layout() {
	self.backgroundColor = '#ff00ff';
}

exports.load = function(obj) {
	layout();

	return self;
};