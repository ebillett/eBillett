
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
	editBtn = Titanium.UI.createButton({title: 'Rediger'}),
	cover = Titanium.UI.createView(styles.cover);


	self.titleControl = general.defaultTitle('Mine steder');
	

var layout = function() {
	
	self.setLeftNavButton(addPlaceBtn);
	self.setRightNavButton(editBtn);

	self.add(general.shadowTop(150));

	self.add(table);

}


exports.load = function() {

	u.setString('place', null);
	
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

	cover.opacity = 0;
	self.add(cover);
	cover.animate({
		opacity: 0.7,
		duration: 300,
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_IN_OUT
	}, function() {
		cover.opacity = 0.7
	});


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

	cover.animate({
		opacity: 0,
		duration: 300,
		delay: 350,
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_IN_OUT
	}, function() {
		self.remove(cover);
	});

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

	u.setString('place', JSON.stringify(e.rowData.obj));

	switch (type) {
		case 'Kino':
			var next = require('ui/buy/ShowCinema').load(e.rowData.obj);
			require('ui/Tabgroup').tabs.buy.open(next);
		break;

		case 'Kultur':
			var next2 = require('ui/buy/ShowCulture').load();
			require('ui/Tabgroup').tabs.buy.open(next2);
		break;

		case 'Begge':
			var next3 = require('ui/buy/ShowCombo').load();
			require('ui/Tabgroup').tabs.buy.open(next3);
		break;
	}

});

