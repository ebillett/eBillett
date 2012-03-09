var general = require('ui/styles/general'),
	//styles = require('ui/styles/buy/ShowCombo'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	u = require('plugins/utils');


	self.titleControl = general.defaultTitle('Gjennomfør kjøp');
	self.tabBarHidden = true;



exports.load = function(url) {
	var web = Ti.UI.createWebView({
            url: url
        });

	self.add(web);

	web.addEventListener('purchaseComplete', function(data) {
		debug(JSON.stringify(data));
	})

	Ti.App.addEventListener('purchaseComplete', function(data) {
		debug('Ti.App.: ' + JSON.stringify(data));
	})

	return self;
}