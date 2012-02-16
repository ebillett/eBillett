var general = require('ui/styles/general');

exports = {
	view: {
		backgroundImage: 'images/buy/add_bg.png',
		width: 299,
		height: 362,
		bottom: -350
	},
	closeBtn: {
		title: '',
		width: 273,
		height: 44,
		backgroundImage: 'images/common/greenbtn_wide.png',
		bottom: 20
	},
	closeTitle: {
		height: 'auto',
		width: 'auto',
		text: 'FERDIG',
		color: '#eee',
		touchEnabled: false,
		font: {
			fontWeight: 'bold',
			fontSize: 16
		},
		shadowColor: '#516a12',
		shadowOffset: {x: 0, y:-1}
	},
	table: {
		top: 5,
		bottom: 80,
		width: 288,
		backgroundColor: 'transparent'
	},
	row: {
		backgroundImage: 'images/buy/table_places.png',
		height: 50,
		selectionStyle: 'none',
		className: 'addplacerow'
	},
	rowTitle: {
		height: 'auto',
		left: 20,
		top: 12,
		touchEnabled: false,
		color: '#444',
		font: {
			fontSize: 16,
			fontWeight: 'bold'
		},
		shadowColor: '#fff',
		shadowOffset: {x: 0, y:1}
	},
	rowNoMobile: {
		text: 'Støtter ikke mobilbillett',
		height: 'auto',
		right: 15,
		top: 8,
		width: 60,
		touchEnabled: false,
		color: '#777',
		font: {
			fontSize: 11,
			fontWeight: 'normal',
			fontStyle: 'italic'
		},
		shadowColor: '#fff',
		shadowOffset: {x: 0, y:1}
	},
	rowCheck: {
		width: 23,
		height: 24,
		backgroundImage: 'images/common/checkbox.png',
		activeImage: 'images/common/checkbox_active.png',
		top: 10,
		right: 18
	},
	search: {
		barColor: '#ccc'
	}
};