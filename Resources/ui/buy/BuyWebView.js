var general = require('ui/styles/general'),
	//styles = require('ui/styles/buy/ShowCombo'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	u = require('plugins/utils'),
	web = Ti.UI.createWebView(),
	interval;


	self.titleControl = general.defaultTitle('Gjennomfør kjøp');
	self.tabBarHidden = true;


function layout(url) {

	web.url = url;

	self.add(web);

};


exports.load = function(url, prevWin) {

	//prevWin.close();

	layout(url);

	return self;
}


web.addEventListener('load', function(data) {
		
	interval = setInterval(checkStatus, 333);

});


function checkStatus() {

	var success = web.evalJS('document.purchaseCompleted && document.purchaseCompleted.pop();');

	var error = web.evalJS('document.purchaseError && document.purchaseError.pop();');

	if(success) {

		clearInterval(interval);

		alert(JSON.stringify(success));

	} else if(error) {
		clearInterval(interval);

		alert(JSON.stringify(error));		
	}
	

};
