var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/places'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	placesLoggedIn = require('ui/buy/places').load(),
	placesLoggedOut = require('ui/buy/places_nologin').load(),
	editing = false,
	wrapper = Titanium.UI.createView(general.wrapper),
	addPlaceBtn = Titanium.UI.createButton(addPlaceBtn),
	addPlaceHint = Titanium.UI.createButton(addPlaceHint),
	addDialog = require('ui/buy/addplaces').load(),
	addDialogActive = false,
	editBtn = Titanium.UI.createButton({title: 'Rediger'});
	//row = Titanium.UI.createTableViewRow(styles.row);


	self.titleControl = general.defaultTitle('Mine steder');


var layout = function() {

	if(app.state == 'limited') {

		debug('limited mode, building full places list');
		self.backgroundColor = '#ff0000';

	} else if (app.state == 'normal') {
		
		debug('normal mode, building full user list');
		self.backgroundColor = '#00ff00';

	}

};


exports.load = function() {
	
	layout();

	// Reset booleans for program loading
	resetProgramLoad();

	return self;
};

// self.addEventListener('focus', function() {
// 	if(app.state && !app.prop.didLoadPlaces) {
// 		debug('Buy window has focus');

// 		// Initialize window only if it has not already been done
// 		//app.prop.didLoadPlaces = true;

// 		loadSavedPlaces();
// 	}
// });



function resetProgramLoad() {
	// Reset app.prop.cinemaLoaded
	app.prop.cinemaLoaded.current = false;
	app.prop.cinemaLoaded.program = false;
	app.prop.cinemaLoaded.coming = false;
}



// editBtn.addEventListener('click', function() {
// 	if(!editing) {
// 		// Not already in edit mode
// 		table.editing = true;
// 		editBtn.title = 'Ferdig';
// 		editing = true;
// 	} else {
// 		// In edit mode
// 		table.editing = false;
// 		editBtn.title = 'Rediger';
// 		editing = false;
// 	}
// });



