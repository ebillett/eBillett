var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/show_dual'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	toggleMode = Titanium.UI.createButton(),
	toggleValue = 'cinema',
	cinemaView,
	cultureView;


function layout(obj) {
	self.titleControl = general.defaultTitle(obj.name);

	self.setRightNavButton(toggleMode);

	// If obj.priority = culture or cinema decides which comes first
	cinemaView = require('ui/buy/show_cinema').loadComponent(obj);

	self.add(cinemaView);
}

exports.load = function(obj) {
	// Set place object to properties
	app.prop.place = obj;

	layout(obj);

	return self;
};

toggleMode.addEventListener('click', function() {
	debug('toggleMode clicked');

	if(toggleValue == 'cinema') {
		debug('Switching to culture');

		//cultureView = require('ui/buy/show_culture').loadComponent(app.prop.place);
		//self.add(cultureView);

		cinemaView.animate({
			top: 480,
			duration: 500,
			delay: 50
		});

		toggleValue = 'culture';

	} else if(toggleValue == 'culture') {
		debug('Switching to cinema');


		cinemaView.animate({
			top: 0,
			duration: 500,
			delay: 200
		});

		toggleValue = 'cinema';
	}
	
});