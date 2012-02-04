var general = require('ui/styles/general'),
	//styles = require('ui/styles/buy/show_cinema'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	selfView = Titanium.UI.createView({height: 480});



function layout(obj) {
	
}

exports.load = function(obj) {
	

	return self;

};

// ------------------------------------
// Component builder
//   when used in dual mode
// ------------------------------------
function layoutComponent(obj) {
	// Setup tabbar
	selfView.backgroundColor = '#ff00f0';
	selfView.top = -480;
}

exports.loadComponent = function(obj) {
	// Set place object to properties
	app.prop.place = obj;

	layoutComponent(obj);

	return selfView;
};


// component builder end