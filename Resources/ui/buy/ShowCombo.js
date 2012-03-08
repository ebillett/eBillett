var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/ShowCombo'),
	u = require('plugins/utils'),
	place,
	showingCinema = true,
	self = Titanium.UI.createWindow(general.defaultWindow),
	switchBtn = Titanium.UI.createButton(styles.switchBtn),
	shadow = general.shadowTop(0),
	CinemaView = require('ui/buy/ShowCinema').loadComponent(),
	//CinemaView = Titanium.UI.createView({backgroundColor: '#000f0f'}),
	CultureView = require('ui/buy/ShowCulture').loadComponent();
	//CultureView = Titanium.UI.createView({backgroundColor: '#ff0f0f'});



function layout() {

	self.titleControl = general.defaultTitle(place.name);

	self.setRightNavButton(switchBtn);

	self.add(CinemaView);

};


exports.load = function() {

	place = JSON.parse(u.getString('place'));

	layout();

	return self;

}

switchBtn.addEventListener('click', function() {

	if(showingCinema) {
		debug('switch to culture');
		// Switch to culture
		//self.remove(CinemaView);
		//self.add(CultureView);
		CinemaView.animate({
			view: CultureView,
			transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});

		switchBtn.title = 'Vis kultur';


	} else if (!showingCinema) {
		debug('switch to cinema');
		// Switch to culture
		// self.remove(CultureView);
		// self.add(CinemaView);

		CultureView.animate({
			view: CinemaView,
			transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
		});

		switchBtn.title = 'Vis kino';

	}

	showingCinema ? showingCinema = false : showingCinema = true;

});