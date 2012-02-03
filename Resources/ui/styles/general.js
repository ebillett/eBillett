exports = {
	dWidth: Ti.Platform.displayCaps.platformWidth,
	dHeight: Ti.Platform.displayCaps.platformHeight,
	defaultWindow: {
		backgroundImage: 'images/common/bg.png',
		barColor: '#222',
		barImage: 'images/common/bar.png',
		backButtonTitle: 'Tilbake'
	},
	defaultTitle: function(title) {
		var label = Titanium.UI.createLabel({
			text: title,
			color: '#ddd',
			shadowColor: '#000',
			shadowOffset: {x: 0, y: -1},
			font: {fontSize: 18, fontWeight: 'bold'}
		});
		return label;
	},
	tabgroup: {
		backgroundImage: 'images/common/bg.png'
	},
	wrapper: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		layout: 'vertical'
	},
	shadowTop: function(top) {
		var instance = Titanium.UI.createView({
			width: 320,
			height: 5,
			top: top,
			backgroundColor: 'transparent',
			backgroundImage: 'images/common/shadow.png',
			touchEnabled: false,
			zIndex: 1001
		});

		return instance;
	}
};