var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/places'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	editing = false,
	wrapper = Titanium.UI.createView(general.wrapper),
	addPlaceBtn = Titanium.UI.createButton(addPlaceBtn),
	addPlaceHint = Titanium.UI.createButton(addPlaceHint),
	addDialog = require('ui/buy/addplaces').load(),
	addDialogActive = false,
	editBtn = Titanium.UI.createButton({title: 'Rediger'}),
	table = Titanium.UI.createTableView(styles.table);
	//row = Titanium.UI.createTableViewRow(styles.row);


	self.titleControl = general.defaultTitle('Mine steder');


var layout = function() {
	self.setLeftNavButton(addPlaceBtn);
	self.setRightNavButton(editBtn);
	
	wrapper.add(table);

	self.add(wrapper);
};

exports.load = function() {
	layout();

	// Reset booleans for program loading
	resetProgramLoad();

	return self;
};

self.addEventListener('focus', function() {
	if(app.state && !app.prop.didLoadPlaces) {
		debug('Buy window has focus');

		// Initialize window only if it has not already been done
		app.prop.didLoadPlaces = true;

		loadSavedPlaces();
	}
});


var loadSavedPlaces = function() {
	// Empty in case of previous load
	table.setData([]);

	var tableData = [];

	if(app.state == 'normal') {
		// Load places from db, but check for updates online

	} else {
		// Load places from db only
		app.db.getPlaces(function(places) {
			if(!places) {
				// No places saved
				debug('No places saved.');
				wrapper.add(addPlaceHint);
			} else {
				debug('Did load ' + places.length + ' locally stored places');

				for (var i = 0, l = places.length; i<l; i++) {
					//table.appendRow(createRow(places[i]));
					var row = createRow(places[i]);
					tableData.push(row);
				}

				table.setData(tableData);
			}
		});

	}
};

var createRow = function(o) {
	var instance = Titanium.UI.createTableViewRow(styles.row),
		title = Titanium.UI.createLabel(styles.rowTitle);
	instance.obj = o;
	title.text =  o.name;

	instance.add(title);


	return instance;
};

var openAddDialog = function() {
	debug('Opening add dialog');

	// Set new titlebar title
	self.titleControl = general.defaultTitle('Legg til');

	var instance = addDialog;
	self.add(instance);
	instance.animate({
		bottom: -15,
		duartion: 1300,
		delay: 200
	});
};

var closeAddDialog = function() {
	debug('Closing add dialog');

	// Set new titlebar title
	self.titleControl = general.defaultTitle('Mine steder');

	var instance = addDialog;
	instance.animate({
		bottom: -350,
		duartion: 1300,
		delay: 200
	}, function() {
		self.remove(instance);
	});
};

function resetProgramLoad() {
	// Reset app.prop.cinemaLoaded
	app.prop.cinemaLoaded.current = false;
	app.prop.cinemaLoaded.program = false;
	app.prop.cinemaLoaded.coming = false;
}

// ------------------------------------
// Events
// ------------------------------------
addPlaceBtn.addEventListener('click', function() {
	if(!addDialogActive) {
		Ti.App.fireEvent('addPlaces.open');
		openAddDialog();

		addDialogActive = true;
	} else {
		closeAddDialog();
		addDialogActive = false;
	}
});

Ti.App.addEventListener('addPlaces.close', function() {
	closeAddDialog();

	addDialogActive = false;
});

editBtn.addEventListener('click', function() {
	if(!editing) {
		// Not already in edit mode
		table.editing = true;
		editBtn.title = 'Ferdig';
		editing = true;
	} else {
		// In edit mode
		table.editing = false;
		editBtn.title = 'Rediger';
		editing = false;
	}
});

Ti.App.addEventListener('addPlaces.new', function() {
	// Update list
	loadSavedPlaces();
});

table.addEventListener('delete', function(e) {
	app.db.deletePlace(e.rowData.obj);
});

table.addEventListener('click', function(e) {
	debug('Clicked on: ' + e.rowData.obj.name + 'which has type: ' + e.rowData.obj.type);

	var type = e.rowData.obj.type;

	switch (type) {
		case 'Kino':
			var next = require('ui/buy/show_cinema').load(e.rowData.obj);
			require('ui/tabgroup').tabs.buy.open(next);
		break;

		case 'Begge':
			var next2 = require('ui/buy/show_dual').load(e.rowData.obj);
			require('ui/tabgroup').tabs.buy.open(next2);
		break;
	}
	
});


