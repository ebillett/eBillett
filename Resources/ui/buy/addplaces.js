var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/addplaces'),
	Place = require('models/Place'),
	view = Titanium.UI.createView(styles.view),
	table = Titanium.UI.createTableView(styles.table),
	search = Titanium.UI.createSearchBar(styles.search),
	closeBtn = Titanium.UI.createButton(styles.closeBtn),
	closeTitle = Titanium.UI.createLabel(styles.closeTitle);


function layout() {
	closeBtn.add(closeTitle);

	view.add(closeBtn);
	view.add(table);

	table.search = search;
	table.filterAttribute = 'hiddenFilter';
}

exports.load = function() {
	layout();

	return view;
};


function getPlaces() {
	table.setData([]);

	var tableData = [];

	app.net.places.get(function(resultData) {
		debug('inside getPlaces callback');
		if(resultData) {
			var places = resultData.result.places;

			// Load previously saved places
			var savedPlaces;
			app.db.getPlaces(function(resultData) {
				savedPlaces = resultData;
			});


			_.each(places, function(a) {
				var isSaved = false;

				// Check if place is stored locally
				_.each(savedPlaces, function(savedPlace) {
					if(savedPlace.name == a.place.name) {
						debug(a.place.name + ' is already saved. Deactivating it');
						isSaved = true;
					}
				});

				// fix så Place-modell tar et objekt
				var obj = new Place(null, a.place.name, a.place.pid, a.place.type, a.place.hasmobile);

				var row = Titanium.UI.createTableViewRow(styles.row);
				row.obj = obj;
				row.isSaved = isSaved;
				row.hasmobile = obj.hasmobile;

				var title = Titanium.UI.createLabel(styles.rowTitle);
				title.text = obj.name;
				row.add(title);


				// Set filter attribute for search
				row.hiddenFilter = obj.name;

				if(!obj.hasmobile) {
					var noMobile = Titanium.UI.createLabel(styles.rowNoMobile);
					row.add(noMobile);
					row.enabled = false;
					title.opacity = 0.5;
				}

				// Add checkbox
				var checkbox = Titanium.UI.createView(styles.rowCheck);
				debug(obj.name + '  is saved: ' + isSaved);


				if(obj.hasmobile && !isSaved) {
					debug('adding checkbox for: ' + obj.name);

					row.add(checkbox);

				} else if (obj.hasmobile && isSaved) {
					debug('adding checkbox active for: ' + obj.name);

					checkbox.backgroundImage = checkbox.activeImage;
					row.add(checkbox);
				}

				Ti.App.addEventListener('addCheckboxActive', function(e) {
					if(e.name == obj.name) {
						checkbox.backgroundImage = checkbox.activeImage;
					}
				});

				tableData.push(row);
			});

		}

		table.setData(tableData);
		
	});
}



// ------------------------------------
// EVENTS
// ------------------------------------
closeBtn.addEventListener('click', function() {
	Ti.App.fireEvent('addPlaces.close');
});


Ti.App.addEventListener('addPlaces.open', function() {
	getPlaces();
});

table.addEventListener('click', function(e) {
	if(!e.rowData.isSaved) {
		if(e.rowData.hasmobile) {
			app.db.savePlace(e.rowData.obj, function(success) {
				if(success) {
					// Fire event to update local list
					Ti.App.fireEvent('addPlaces.new');

					e.row.backgroundColor = '#ddd';
					e.rowData.isSaved = true;

					Ti.App.fireEvent('addCheckboxActive', {name: e.rowData.obj.name});

					debug('Saved success');
				} else {
					debug('Save failed... :-(');
				}
			});
		} else {
			alert('Beklager. Dette stedet støtter ikke mobilbillett, og kan derfor ikke legges til');
		}
	}
});
