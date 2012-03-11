exports = {

	wrapper: {
		backgroundImage: 'images/tickets/ticket.png',
		top: 10,
		width: 301,
		height: 354
	},
	qrWrapper: {
		backgroundImage: 'images/tickets/ticket-qr.png',
		top: 10,
		width: 301,
		height: 354
	},
	qrImg: {
		width: 265,
		height: 265
	},
	tPlace: {
		color: '#666',
		font: {
			fontSize: 12,
			fontWeight: 'bold'
		},
		top: 20,
		left: 20,
		width: 'auto',
		height: 'auto'
	},
	tTitle: {
		color: '#333',
		font: {
			fontSize: 16,
			fontWeight: 'normal'
		},
		top: 45,
		left: 20,
		width: 'auto',
		height: 'auto'
	},
	tTime: {
		color: '#333',
		font: {
			fontSize: 14,
			fontWeight: 'bold'
		},
		top: 80,
		left: 20,
		width: 'auto',
		height: 'auto'
	},
	tDate: {
		color: '#333',
		font: {
			fontSize: 14,
			fontWeight: 'normal'
		},
		top: 20,
		right: 20,
		width: 'auto',
		height: 'auto'
	},
	tRoom: {
		color: '#333',
		font: {
			fontSize: 14,
			fontWeight: 'normal'
		},
		top: 80,
		left: 85,
		width: 'auto',
		height: 'auto'
	},
	table: {
		top: 105,
		left: 10,
		right: 10,
		height: 100,
		backgroundColor: '#ddd'
	},
	tPurch: {
		color: '#666',
		font: {
			fontSize: 11,
			fontWeight: 'normal',
			fontStyle: 'italic'
		},
		top: 225,
		left: 20,
		width: 'auto',
		height: 'auto'
	},
	shareBtn: {
		width: 125,
		height: 34,
		top: 215,
		right: 10,
		backgroundImage: 'images/tickets/button-share.png'
		//backgroundSelectedImage: 'images/common/button-green-pressed.png'
	},
	shareBtnLabel: {
		height: 'auto',
		width: 'auto',
		text: 'Del på Facebook',
		color: '#fff',
		touchEnabled: false,
		font: {
			fontWeight: 'bold',
			fontSize: 12
		},
		shadowColor: '#1b3268',
		shadowOffset: {x: 0, y:-1}
	},
	codeBtn: {
		width: 251,
		height: 50,
		bottom: 20,
		backgroundImage: 'images/common/button-grey.png',
		backgroundSelectedImage: 'images/common/button-green-pressed.png'
	},
	codeBtnLabel: {
		height: 'auto',
		width: 'auto',
		text: 'Vis billettkode',
		color: '#666',
		touchEnabled: false,
		font: {
			fontWeight: 'bold',
			fontSize: 16
		},
		shadowColor: '#fff',
		shadowOffset: {x: 0, y:1}
	},
	cover: {
		backgroundColor: '#000',
		opacity: 0,
		zIndex: 200
	},
	ticketImg: {
		width: 280,
		height: 280,
		opacity: 0,
		backgroundColor: '#eee',
		borderColor: '#fff',
		borderWidth: 4,
		zIndex: 205,
		touchEnabled: false
	}

};