var general = require('ui/styles/general'),
	styles = require('ui/styles/buy/BuyWebView'),
	self = Titanium.UI.createWindow(general.defaultWindow),
	u = require('plugins/utils'),
	toLoad = '',
	continueBtn = Titanium.UI.createButton(styles.continueBtn),
	continueBtnLbl = Titanium.UI.createLabel(styles.continueBtnLbl)
	web = Ti.UI.createWebView({

	}),
	interval = '';


	self.titleControl = general.defaultTitle('Gjennomfør kjøp');
	self.tabBarHidden = true;


function layout(toLoad) {

	//web.url = toLoad;
	//web.url = 'http://nyan.no/dev/detect.html';

	

};


exports.load = function(url, prevWin) {

	//prevWin.close();

	toLoad = url;
	//toLoad = 'http://nyan.no/dev/detect.html';

	web = Titanium.UI.createWebView({url: toLoad});
	self.add(web);

	web.addEventListener('load', function(data) {
		debug('webview load');
		interval = setInterval(checkStatus, 333);

	});


	//layout(toLoad);


	//app.oldWin.push(self);

	return self;
}




function checkStatus() {



	var success = web.evalJS('document.purchaseCompleted && document.purchaseCompleted.pop();');

	var error = web.evalJS('document.purchaseError && document.purchaseError.pop();');


	if(success) {

		clearInterval(interval);

		continueBtn.add(continueBtnLbl);
		self.add(continueBtn);

		continueBtn.addEventListener('click', function() {
			var tabgroup = require('ui/Tabgroup');

			for(var i = 0; i<app.oldWin.length;i++){
				tabgroup.tabs.buy.close(app.oldWin[i],{animated:false});
			}
			
			tabgroup.tabs.buy.close(self,{animated:true});
			tabgroup.set(1);

			self.remove(continueBtn);

			Ti.App.fireEvent('tickets:check');
		});

		

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
