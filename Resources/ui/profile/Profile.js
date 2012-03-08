var general = require('ui/styles/general'),
	styles = require('ui/styles/profile/Profile'),
	net = require('services/network'),
	u = require('plugins/utils'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	table = Titanium.UI.createTableView(styles.table),
	logoutBtn = Titanium.UI.createButton(styles.logoutBtn);


	self.titleControl = general.defaultTitle('Min profil');


var layout = function() {
	
	wrapper.add(table);

	wrapper.add(logoutBtn);

	self.add(wrapper);
};

exports.load = function() {
	layout();

	return self;
};


function getUserInfo() {

	var user = JSON.parse(u.getString('user:info')),
		userid = user.profil_id;

	// Fetch user info online, or fallback to local
	net.user.getInfo(userid, function(responseData) {

		if(responseData) {
					
					if(responseData.result.status == 'NOK') {
						// Error
						alert(responseData.result.message);	
					
					} else {

						debug('got user info online: ')
						debug(JSON.stringify(responseData));
						var user = responseData.profil;

						createUserTable(user);

					}



				} else {

					debug('fetching local user info');

					createUserTable(user);

				}

	});


	function getLocalInfo() {
		// Fallback to locally stored user info
		// if only retrieve fails

		return JSON.parse(u.getString('user:info'));
	};

};


function createUserTable(user) {

	var data = [
		{title: 'Navn: '},
		{title: 'Epost: ' + user.epost}
	];

	table.setData(data);

}


logoutBtn.addEventListener('click', function() {
	app.user.logout();
	require('ui/Tabgroup').set(0);
});

self.addEventListener('focus', function() {
	getUserInfo();
});
