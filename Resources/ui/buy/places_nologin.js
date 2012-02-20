var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/places_nologin'),
	Place = require('models/Place'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	prev = false,
	wrapper = Titanium.UI.createView(general.wrapper),
	infoWrapper = Titanium.UI.createView(styles.infoWrapper),
	table = Titanium.UI.createTableView(styles.table),
	search = Titanium.UI.createSearchBar(styles.search);


	self.titleControl = general.defaultTitle('Velg sted');


function layout() {
		
	self.add(infoWrapper);
	self.add(table);
	self.add(general.shadowTop(116));

	table.search = search;
	table.filterAttribute = 'filter';

}


exports.load = function() {
	layout();
	getPlaces();

	return self;

};

function getPrevious() {
	
	var prev = Titanium.App.Properties.getInt('nologin_place');

	debug('Previous selection: ' + prev);

	return prev;

}

function getPlaces() {
	table.setData([]);

	var tableData = [];

	var id = 0;
	prev = getPrevious();

	app.net.places.get(function(resultData) {
		debug('inside getPlaces callback');
		if(resultData) {
			var places = resultData.result.places;

			_.each(places, function(a) {

				// fix så Place-modell tar et objekt
				var obj = new Place(null, a.place.name, a.place.pid, a.place.type, a.place.hasmobile);

				var row = Titanium.UI.createTableViewRow(styles.row);
				row.obj = obj;
				row.hasmobile = obj.hasmobile;
				row.filter = obj.name;

				var title = Titanium.UI.createLabel(styles.rowTitle);
				title.text = obj.name;
				row.add(title);

				if(!obj.hasmobile) {
					var noMobile = Titanium.UI.createLabel(styles.rowNoMobile);
					row.add(noMobile);
					row.enabled = false;
					title.opacity = 0.5;
				}

				if(id == prev) {
					//row.backgroundImage = row.altImage;
					title.color = '#80a221';
				}
				id++;

				tableData.push(row);
			});

		}

		table.setData(tableData);

		if(prev) {
			table.scrollToIndex(prev+3);
		}
		
	});
}


// ------------------------------------
// Events
// ------------------------------------
table.addEventListener('click', function(e) {
	
	// Persist selection
	Titanium.App.Properties.setInt('nologin_place', e.index);


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



