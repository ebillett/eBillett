exports.setString = function(name, value) {
	Ti.App.Properties.setString(name, value);
};

exports.getString = function(name) {
	return Ti.App.Properties.getString(name);
};

exports.setBool = function(name, value) {
	Ti.App.Properties.setBool(name, value);
};

exports.getBool = function(name) {
	return Ti.App.Properties.getBool(name);
};




// Programatically logging out during development
exports.logOut = function() {
	if(DEBUG) {
		Ti.App.Properties.setString('user:loggedIn', 0);
	}
};


exports.loading = function(top, txt) {
	if(!top) {
		var top = 100;
	}

	if(!txt) {
		var txt = 'Laster inn...';
	}

	var instance = Titanium.UI.createView({backgroundColor: '#000', opacity: 0.7, zIndex: 1010, layout: 'vertical'});
	var label = Titanium.UI.createLabel({
		text: txt,
		top: 20,
		width: 'auto',
		height: 'auto',
		font: {
			fontSize: 14,
			fontWeight: 'bold'
		},
		color: '#fff',
		shadowColor: '#000',
		shadowOffset: {x: 0, y: 1}
	});
	
	// var icon = Titanium.UI.createView({backgroundImage: 'images/common/icon_loading.png', width: 30, height: 26, top: 130});
	
	// //Animation
	// var t = Ti.UI.create2DMatrix();
	// t = t.rotate(180);
	
	// icon.animate({
	// 	transform: t,
	// 	duration: 400,
	// 	repeat: 100,
	// 	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_IN_OUT
	// });
	
	// instance.add(icon);

	var actInd = Ti.UI.createActivityIndicator({
      	style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
      	height:30,
      	width:30,
      	top: top
    });
     
    instance.add(actInd);
    instance.add(label);

    actInd.show();
	
	return instance;
}

exports.infoPop = function(txt, delay) {

	if(!delay) {
		var delay = 0;
	}

	var instance = Titanium.UI.createView({
		backgroundColor: '#000',
		opacity: 0,
		borderRadius: 6,	
		width: 200,
		height: 100,
		zIndex: 500
	});

	var label = Titanium.UI.createLabel({
		text: txt,
		width: 'auto',
		height: 'auto',
		font: {
			fontSize: 16,
			fontWeight: 'bold'
		},
		color: '#fff',
		shadowColor: '#000',
		shadowOffset: {x: 0, y: 1}
	});

	instance.add(label);

	instance.animate({
		opacity: 0.8,
		duration: 200,
		delay: delay
	}, function() {
		instance.opacity = 0.8;
	})

	return instance;

}

exports.fadeout = function(obj) {
	obj.animate({
		duration: 750,
		opacity: 0
	}, function() {
		obj.opacity = 0;
	});
	
	setTimeout(callback(), 750);
}


exports.generateQrCode = function(receipt, callback) {

	// Should create backup-load if code cannot be saved instantly after purchase

	var qrUrl = 'http://chart.apis.google.com/chart?cht=qr&chl=' + receipt +'&chs=265x265',
		filename = 'ticket_' + receipt + '.png';

	var c = Titanium.Network.createHTTPClient();

	c.setTimeout(10000);
	c.onload = function() {
		if (c.status == 200 ) {
			
			var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
			f.write(this.responseData);
			
			callback(true);

		} else {

			debug('error writing ticket image');
			
			callback(false)

		}
	};

	c.open('GET',qrUrl);
	c.send();  



}