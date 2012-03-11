exports = {

	wrapper: {
		backgroundImage: 'images/tickets/ticket.png',
		top: 10,
		width: 301,
		height: 354
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
	codeBtn: {
		width: 251,
		height: 50,
		bottom: 45,
		backgroundImage: 'images/common/button-grey.png',
		backgroundSelectedImage: 'images/common/button-green-pressed.png'
	},
	codeBtnLabel: {
		height: 'auto',
		width: 'auto',
		text: 'Vis billettkode',
		color: '#eee',
		touchEnabled: false,
		font: {
			fontWeight: 'bold',
			fontSize: 16
		},
		shadowColor: '#516a12',
		shadowOffset: {x: 0, y:-1}
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