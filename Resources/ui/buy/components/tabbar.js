var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/components/tabbar'),
	tabbar = Titanium.UI.createView(styles.tabbar);


// Settings
var width = 106,
	items = [
		{title: 'Aktuelle', id: 0, left: 1},
		{title: 'Program', id: 1, left: 1+width},
		{title: 'Kommende', id: 2, left: 2*width+1}
	],
	activeTab = 0;

exports.init = function() {
	_.each(items, function(item) {
		
		tabbar.add(new Tab(item));

	});

	return tabbar;
};




function Tab(item) {
	var instance = Titanium.UI.createView(styles.tab);
	instance.left = item.left;

	var label = Titanium.UI.createLabel(styles.tabLabel);
	label.text = item.title;

	instance.add(label);

	function reset() {
		if(item.id != activeTab) {
			instance.backgroundImage = null;
		}
	}

	// Events
	instance.addEventListener('click', function() {
		Ti.App.fireEvent('cinematab_change', {id: item.id});
		debug(item.title);
		activeTab = item.id;

		instance.backgroundImage = instance.selectedBg;
	});

	Ti.App.addEventListener('cinematab_change', function() {
		reset();
	});


	// Initiate first tab
	if(item.id === 0) {
		activeTab = item.id;
		instance.backgroundImage = instance.selectedBg;
	}


	return instance;
}