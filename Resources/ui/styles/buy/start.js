
exports = {
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
		title: '+'
	},
	addPlaceHint: {
		title: 'Ingen steder lagret. Klikk her for å legge til',
		//width: 'auto',
		height: 50
	}
};
