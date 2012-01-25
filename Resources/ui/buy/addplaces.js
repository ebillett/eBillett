var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/addplaces'),
	Place = require('models/Place'),
	view = Titanium.UI.createView(styles.view),
	table = Titanium.UI.createTableView(styles.table);
	closeBtn = Titanium.UI.createButton(styles.closeBtn);


function layout() {
	view.add(closeBtn);
	view.add(table);
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

			_.each(places, function(a) {
				// fix så Place-modell tar et objekt
				var obj = new Place(null, a.place.name, a.place.pid, a.place.type, a.place.hasmobile);
				var row = Titanium.UI.createTableViewRow({title: obj.name});
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