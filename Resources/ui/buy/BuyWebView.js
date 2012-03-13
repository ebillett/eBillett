var general = require('ui/styles/general'),
	//styles = require('ui/styles/buy/ShowCombo'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	u = require('plugins/utils'),
	toLoad = '',
	web = Ti.UI.createWebView({

	}),
	interval;


	self.titleControl = general.defaultTitle('Gjennomfør kjøp');
	self.tabBarHidden = true;


function layout(toLoad) {

	web.url = toLoad;

	

};


exports.load = function(url, prevWin) {

	//prevWin.close();

	toLoad = url;

	layout(toLoad);

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

self.addEventListener('focus', function() {
	self.add(web);
});

self.addEventListener('blur', function() {
	web.url = 'index.html';
	self.remove(web);
});
