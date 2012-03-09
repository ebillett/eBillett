var general = require('ui/styles/general'),
	styles = require('ui/styles/profile/Profile'),
	net = require('services/network'),
	u = require('plugins/utils'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	wrapper = Titanium.UI.createView(general.wrapper),
	userHeader = Titanium.UI.createView(styles.tableHeader),
	userHeaderTitle = Titanium.UI.createLabel(styles.tableHeaderTitle),
	table = Titanium.UI.createTableView(styles.table),
	easyHeader = Titanium.UI.createView(styles.tableHeader),
	easyHeaderTitle = Titanium.UI.createLabel(styles.tableHeaderTitle),
	easyWrapper = Titanium.UI.createView(styles.easyWrapper),
	easyLabel = Titanium.UI.createLabel(styles.easyLabel),
	didLoadInfo = false;
	logoutBtn = Titanium.UI.createButton(styles.logoutBtn);


	self.titleControl = general.defaultTitle('Min profil');
	self.add(general.shadowTop(26));


var layout = function() {
	
	userHeaderTitle.text = 'Brukerinformasjon';
	userHeader.add(userHeaderTitle);
	userHeader.top = 1;
	wrapper.add(userHeader);

	wrapper.add(table);

	easyHeaderTitle.text = 'Enkel betaling';
	easyHeader.add(easyHeaderTitle);
	wrapper.add(easyHeader);

	easyWrapper.add(easyLabel);

	wrapper.add(easyWrapper);


	//self.add(logoutBtn);
	self.setRightNavButton(logoutBtn);

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

	table.setData([]);

	function createRow(lbl, txt) {
		var row = Titanium.UI.createTableViewRow(styles.row),
			label = Titanium.UI.createLabel(styles.label),
			text = Titanium.UI.createLabel(styles.txt);

		if(!txt) {
			var txt = '—';
		}

		label.text = lbl;
		text.text = txt;

		row.add(label);
		row.add(text);

		debug('create row for ' + lbl + ': ' + txt);

		return row;
	};


	// Add rows
	var usern = user.fornavn + ' ' + user.etternavn;
	table.appendRow(createRow('Navn', usern));
	table.appendRow(createRow('Epost', user.epost));
	table.appendRow(createRow('Mobil', user.mobil));
	table.appendRow(createRow('Adresse', user.adresse1));
	table.appendRow(createRow('', user.adresse2));
	table.appendRow(createRow('Postnr', user.postnr));
	table.appendRow(createRow('Poststed', user.poststed));

}


logoutBtn.addEventListener('click', function() {
	app.user.logout();
	require('ui/Tabgroup').set(0);
});

self.addEventListener('focus', function() {
	if(!didLoadInfo) {
		getUserInfo();
		didLoadInfo = true;
	}
});
