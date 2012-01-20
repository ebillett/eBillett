var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/addplaces'),
	view = Titanium.UI.createView(styles.view),
	closeBtn = Titanium.UI.createButton(styles.closeBtn);

exports.load = function() {
	view.add(closeBtn);

	return view;
};


// ------------------------------------
// EVENTS
// ------------------------------------
closeBtn.addEventListener('click', function() {
	Ti.App.fireEvent('addPlaces.close');
});
