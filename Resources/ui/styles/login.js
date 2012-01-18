exports = {
	loginWin: {
		backgroundImage: 'images/login/bg.png',
		navBarHidden: true
	},
	loginWrapper: {
		layout: 'vertical',
		top: 40,
		height: 360
	},
	usernameField: {
		hintText: 'Brukernavn',
		color: '#000',
		height:50,
		width: 245,
		backgroundColor: '#fff',
		borderRadius: 6,
		borderColor: '#bbb',
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		left:4,
		right: 4,
		autocorrect: false,
		paddingLeft: 8
	},
	passwordField: {
		hintText: 'Passord',
		color: '#ccc',
		height:50,
		width: 245,
		top: 10,
		backgroundColor: '#fff',
		borderRadius: 6,
		borderColor: '#bbb',
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		passwordMask: true,
		autocorrect: false,
		paddingLeft: 8
	},
	loginBtn: {
		width: 245,
		height: 40,
		title: 'Logg inn'
	}
};