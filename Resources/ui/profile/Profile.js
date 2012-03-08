var general = require('ui/styles/general'),
	styles = require('ui/styles/profile/Profile'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	table = Titanium.UI.createTableView(styles.table),
	logoutBtn = Titanium.UI.createButton(styles.logoutBtn);


	self.titleControl = general.defaultTitle('Min profil');

var testData = [
	{title: 'Navn: Martin Berg'},
	{title: 'Epost: martin@dx.no'},
	{title: 'Mobil: 480 26 774'},
	{title: ''}
];

var layout = function() {
	
	wrapper.add(table);
	table.setData(testData);

	wrapper.add(logoutBtn);

	self.add(wrapper);
};

exports.load = function() {
	layout();

	return self;
};


logoutBtn.addEventListener('click', function() {
	app.user.logout();
	require('ui/Tabgroup').set(0);
});
