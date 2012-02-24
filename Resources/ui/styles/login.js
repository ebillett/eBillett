var general = require('ui/styles/general');

exports = {
	loginWin: {
		backgroundImage: 'images/login/bg.png',
		navBarHidden: true
	},
	logo: {
		width: 101,
		height: 28,
		top: 40,
		backgroundImage: 'images/common/logo.png'
	},
	contentWrapper: {
		top: 95,
		width: general.dWidth*2,
		left: 0,
		layout: 'horizontal'
	},
	loginWrapper: {
		layout: 'vertical',
		top: 0,
		width: general.dWidth,
		height: 300
	},
	usernameField: {
		hintText: 'Epostadresse',
		color: '#000',
		height:40,
		width: 245,
		backgroundColor: '#fff',
		borderRadius: 4,
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
		height:40,
		width: 245,
		top: 6,
		backgroundColor: '#fff',
		borderRadius: 4,
		borderColor: '#bbb',
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		passwordMask: true,
		autocorrect: false,
		paddingLeft: 8
	},
	loginBtn: {
		width: 245,
		height: 50,
		top: 10,
		backgroundImage: 'images/common/greenbtn.png'
	},
	loginBtnLabel: {
		height: 'auto',
		width: 'auto',
		text: 'LOGG INN',
		color: '#eee',
		touchEnabled: false,
		font: {
			fontWeight: 'bold',
			fontSize: 16
		},
		shadowColor: '#516a12',
		shadowOffset: {x: 0, y:-1}
	},
	notRegisteredWrapper: {
		layout: 'vertical',
		height: 130,
		top: 20,
		zIndex: 500,
		touchEnabled: true
	},
	nrTitle: {
		height: 'auto',
		left: 40,
		top: 15,
		touchEnabled: false,
		text: 'Opprette konto?',
		color: '#666',
		font: {
			fontSize: 18
		},
		shadowColor: '#fff',
		shadowOffset: {x: 0, y:1}
	},
	nrInfo: {
		height: 'auto',
		left: 40,
		top: 6,
		touchEnabled: false,
		text: 'For å kjøpe billetter og bruke telefonen \nsom billett må du ha en konto',
		color: '#666',
		font: {
			fontSize: 14
		},
		shadowColor: '#fff',
		shadowOffset: {x: 0, y:1}
	},
	nrLink: {
		height: 'auto',
		left: 40,
		top: 12,
		touchEnabled: false,
		text: 'Klikk her for å komme i gang',
		color: '#516a12',
		font: {
			fontSize: 14,
			fontWeight: 'bold'
		},
		shadowColor: '#fff',
		shadowOffset: {x: 0, y:1}
	},
	seperator: {
		height: 3,
		backgroundImage: 'images/common/seperator.png'
	},
	continueWrapper: {
		bottom: 0,
		height: 60,
		width: 320,
		zIndex: 500
	},
	continueLabel: {
		height: 'auto',
		left: 40,
		top: 18,
		touchEnabled: false,
		text: 'Fortsett uten å logge inn  ›',
		color: '#555',
		font: {
			fontSize: 14,
			fontWeight: 'bold'
		},
		shadowColor: '#eee',
		shadowOffset: {x: 0, y:1}
	},
	noLoginAlert: {
		title: 'Du kan ikke kjøpe billetter hvis du fortsetter uten å logge inn.',
		options: ['OK', 'Avbryt'],
		cancel: 1
	},
	registerWrapper: {
		layout: 'vertical',
		top: 0,
		height: 300,
		width: general.dWidth,
		right: -general.dWidth
	},
	r_nameField: {
		hintText: 'Navn',
		color: '#000',
		height:40,
		width: 245,
		//top: 6,
		backgroundColor: '#fff',
		borderRadius: 4,
		borderColor: '#bbb',
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		left:4,
		right: 4,
		autocorrect: false,
		paddingLeft: 8
	},
	r_telField: {
		hintText: 'Mobilnummer',
		color: '#000',
		height:40,
		width: 245,
		top: 6,
		backgroundColor: '#fff',
		borderRadius: 4,
		borderColor: '#bbb',
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		left:4,
		right: 4,
		autocorrect: false,
		paddingLeft: 8
	},
	r_emailField: {
		hintText: 'Epostadresse',
		color: '#000',
		height:40,
		width: 245,
		top: 12,
		backgroundColor: '#fff',
		borderRadius: 4,
		borderColor: '#bbb',
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		left:4,
		right: 4,
		autocorrect: false,
		paddingLeft: 8
	},
	r_passwordField: {
		hintText: 'Passord',
		color: '#ccc',
		height:40,
		width: 245,
		top: 6,
		backgroundColor: '#fff',
		borderRadius: 4,
		borderColor: '#bbb',
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		passwordMask: true,
		autocorrect: false,
		paddingLeft: 8
	},
	r_password2Field: {
		hintText: 'Gjenta passord',
		color: '#ccc',
		height:40,
		width: 245,
		top: 6,
		backgroundColor: '#fff',
		borderRadius: 4,
		borderColor: '#bbb',
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		passwordMask: true,
		autocorrect: false,
		paddingLeft: 8
	},
	registerBtn: {
		width: 245,
		height: 50,
		top: 10,
		backgroundImage: 'images/common/greenbtn.png'
	},
	registerBtnLabel: {
		height: 'auto',
		width: 'auto',
		text: 'REGISTRER',
		color: '#eee',
		touchEnabled: false,
		font: {
			fontWeight: 'bold',
			fontSize: 16
		},
		shadowColor: '#516a12',
		shadowOffset: {x: 0, y:-1}
	},
	backBtn: {
		width: 24,
		height: 20,
		backgroundImage: 'images/login/back.png',
		top: 60,
		left: 40,
		opacity: 0
	}
};