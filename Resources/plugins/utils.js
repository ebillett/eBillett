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


exports.loading = function() {
	var instance = Titanium.UI.createView({backgroundColor: '#000', opacity: 0.7, zIndex: 50});
	var label = Titanium.UI.createLabel({
		text: 'Laster inn... ',
		top: 200,
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
	
	var icon = Titanium.UI.createView({backgroundImage: 'images/common/icon_loading.png', width: 30, height: 26, top: 130});
	
	//Animation
	var t = Ti.UI.create2DMatrix();
	t = t.rotate(180);
	
	icon.animate({
		transform: t,
		duration: 400,
		repeat: 100,
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_IN_OUT
	});
	
	instance.add(label);
	instance.add(icon);
	
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