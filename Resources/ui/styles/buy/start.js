
exports = {
	welcome: {
		width: 318,
		height: 148,
		top: 1,
		left: 1,
		defaultImage: 'images/buy/welcome.png',
		backgroundImage: 'images/buy/welcome.png',
		image: 'http://ma01.dx.no/cover.png'

	},
	table: {
		height: 300,
		top: 150,
		editable: true,
		backgroundColor: 'transparent'
	},
	row: {
		className: 'place',
		backgroundImage: 'images/buy/table_places.png',
		hasChild: true,
		height: 60
	},
	rowTitle: {
		height: 'auto',
		left: 20,
		//top: 12,
		touchEnabled: false,
		color: '#444',
		font: {
			fontSize: 16,
			fontWeight: 'bold'
		},
		shadowColor: '#fff',
		shadowOffset: {x: 0, y:1}
	},
	rowMobile: {
		height: 20,
		width: 20,
		right: 20,
		backgroundColor: '#ff0000'
	},
	addPlaceBtn: {
		title: '+',
		image: 	'images/buy/icon-add.png',
		backgroundImage: 'transparent'
	},
	addPlaceHint: {
		title: 'Ingen steder lagret. Klikk her for å legge til',
		//width: 'auto',
		height: 50
	},
	cover: {
		backgroundColor: '#000',
		opacity: 0.7,
		zIndex: 550
	}
};
