
var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/Start'),
	u = require('plugins/utils'),
	db = require('services/db'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	addPlaceBtn = Titanium.UI.createButton(addPlaceBtn),
	addPlaceHint = Titanium.UI.createButton(addPlaceHint),
	addDialog = require('ui/buy/AddPlaceDialog').load(),
	addDialogActive = false,
	editing = false,
	table = Titanium.UI.createTableView(styles.table),
	editBtn = Titanium.UI.createButton({title: 'Rediger'});


	self.titleControl = general.defaultTitle('Mine steder');
	

var layout = function() {
	
	self.setLeftNavButton(addPlaceBtn);
	self.setRightNavButton(editBtn);

	self.add(table);
}


exports.load = function() {
	
	layout();
	
	
	return self;
	
}


self.addEventListener('focus', function() {
	
	loadSavedPlaces();

});


var loadSavedPlaces = function() {
	// Empty in case of previous load
	table.setData([]);


	var tableData = [];

		// Load places from db only
		db.getPlaces(function(places) {
			if(!places) {
				// No places saved
				debug('No places saved.');
				//wrapper.add(addPlaceHint);
			} else {
				debug('Did load ' + places.length + ' locally stored places');

				_.each(places, function(place) {
					//table.appendRow(createRow(places[i]));
					var row = createRow(place);
					tableData.push(row);
				
				});

				table.setData(tableData);
			}
		});

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
		duration: 500,
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_IN_OUT
	});
};

var closeAddDialog = function() {
	debug('Closing add dialog');

	// Set new titlebar title
	self.titleControl = general.defaultTitle('Mine steder');

	var instance = addDialog;
	instance.animate({
		bottom: -350,
		duration: 500,
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_IN_OUT
	}, function() {
		self.remove(instance);
	});
};


// ------------------------------------
// EVENTS
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
	db.deletePlace(e.rowData.obj);
});

table.addEventListener('click', function(e) {
	debug('Clicked on: ' + e.rowData.obj.name + 'which has type: ' + e.rowData.obj.type);

	var type = e.rowData.obj.type;

	// switch (type) {
	// 	case 'Kino':
	// 		var next = require('ui/buy/show_cinema').load(e.rowData.obj);
	// 		require('ui/tabgroup').tabs.buy.open(next);
	// 	break;

	// 	case 'Begge':
	// 		var next2 = require('ui/buy/show_dual').load(e.rowData.obj);
	// 		require('ui/tabgroup').tabs.buy.open(next2);
	// 	break;
	// }

});

