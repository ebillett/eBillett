var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/addplaces'),
	view = Titanium.UI.createView(styles.view),
	table = Titanium.UI.createTableView();
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
	app.net.places.get(function(places) {
		_.each(place, function() {
			debug(place.name);
		});
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