var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/Limited'),
	net = require('services/network'),
	u = require('plugins/utils'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	Place = require('models/Place'),
	prev = false,
	container,
	tab,
	infoWrapper = Titanium.UI.createView(styles.infoWrapper),
	table = Titanium.UI.createTableView(styles.table),
	search = Titanium.UI.createSearchBar(styles.search);

	self.titleControl = general.defaultTitle('Velg sted');
	

var layout = function() {
	
	self.add(infoWrapper);
	self.add(table);
	self.add(general.shadowTop(116));
	
	table.search = search;
	
}

exports.load = function() {
	
	layout();
	getPlaces();
	
	// Setup fake tabgroup for navigation control
	container = Titanium.UI.createTabGroup();
	
	tab = Titanium.UI.createTab({
		title: 'Velg sted',
		window: self
	});
	
	self.tabBarHidden = true;
	
	container.addTab(tab);
	
	return container;
	
}



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

		net.places.get(function(resultData) {
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

	debug('Clicked on: ' + e.rowData.obj.name + ' which has type: ' + e.rowData.obj.type);
	u.setString('place', JSON.stringify(e.rowData.obj));

	var type = e.rowData.obj.type;

	switch (type) {
		case 'Kino':
			var next = require('ui/buy/ShowCinema').load(e.rowData.obj);
			tab.open(next);
		break;

		case 'Begge':
			//var next2 = require('ui/buy/show_dual').load(e.rowData.obj);
			//require('ui/tabgroup').tabs.buy.open(next2);
		break;
	}

});

self.addEventListener('focus', function() {
	u.resetCinemaLoaded();
});

