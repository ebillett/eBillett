var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/places'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	editing = false,
	wrapper = Titanium.UI.createView(general.wrapper),
	addPlaceBtn = Titanium.UI.createButton(addPlaceBtn),
	addPlaceHint = Titanium.UI.createButton(addPlaceHint),
	addDialog = require('ui/buy/addplaces').load(),
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

	if(o.hasmobile) {
		var mobile = Titanium.UI.createView(styles.rowMobile);
		instance.add(mobile);
	}

	return instance;
};

var openAddDialog = function() {
	debug('Opening add dialog');

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

	var instance = addDialog;
	instance.animate({
		bottom: -350,
		duartion: 1300,
		delay: 200
	}, function() {
		self.remove(instance);
	});
};

// ------------------------------------
// Events
// ------------------------------------
addPlaceBtn.addEventListener('click', function() {
	Ti.App.fireEvent('addPlaces.open');
	openAddDialog();
});

Ti.App.addEventListener('addPlaces.close', function() {
	closeAddDialog();
});

Ti.App.addEventListener('addPlaces.new', function() {
	// Update list
	loadSavedPlaces();
});

table.addEventListener('delete', function(e) {
	app.db.deletePlace(e.rowData.obj);
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


