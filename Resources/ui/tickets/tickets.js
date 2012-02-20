var general = require('ui/styles/general'),
	styles = require('ui/styles/tickets/tickets'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	table = Titanium.UI.createTableView(styles.table),
	historyRow = Titanium.UI.createTableViewRow(styles.historyRow),
	logoutBtn = Titanium.UI.createButton(styles.logoutBtn);


	self.titleControl = general.defaultTitle('Mine billetter');


var layout = function() {

	self.add(table);


	table.setData([
	historyRow,
	{title: 'Test 1'},
	{title: 'Test 1'},
	{title: 'Test 1'},
	{title: 'Test 1'},
	{title: 'Test 1'}
	]);

};

exports.load = function() {
	layout();

	return self;
};

self.addEventListener('focus', function() {

	setTimeout(function() {
		table.scrollToTop(60);
	}, 1500);
});