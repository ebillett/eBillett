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
				var row = Titanium.UI.createTableViewRow({
					title: obj.name,
					backgroundColor: isSaved? '#ddd' : '#fff',
					hascheck: obj.hasmobile? true : false,
					opacity: obj.hasmobile? 0.5 : 100,
					obj: obj,
					isSaved: isSaved
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
		app.db.savePlace(e.rowData.obj, function(success) {
			if(success) {
				// Fire event to update local list
				Ti.App.fireEvent('addPlaces.new');

				e.row.backgroundColor = '#ddd';
				e.rowData.isSaved = true;

				debug('Saved success');
			} else {
				debug('Save failed... :-(');
			}
		});
	}
});
