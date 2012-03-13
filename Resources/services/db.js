
var Place = require('models/Place'),
	Purchase = require('models/Purchase');


// Bootstrap database
exports.bootstrap = function() {
    var db = Ti.Database.open('eBillett');
    db.execute('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY, name VARCHAR(16) NOT NULL, pid INTEGER NOT NULL, type VARCHAR(16) NOT NULL, hasmobile INTEGER NOT NULL)');
    db.execute('CREATE TABLE IF NOT EXISTS purchases (id INTEGER PRIMARY KEY,  user INTEGER NOT NULL, title VARCHAR(100) NOT NULL, place VARCHAR(100) NOT NULL, pid INTEGER NOT NULL, receipt_id INTEGER NOT NULL, utref VARCHAR(100) NOT NULL, fdato VARCHAR(100) NOT NULL, fkl VARCHAR(100) NOT NULL, dato VARCHAR(100) NOT NULL, kl VARCHAR(100) NOT NULL, showroom VARCHAR(100) NOT NULL)');
    db.execute('CREATE TABLE IF NOT EXISTS tickets (id INTEGER PRIMARY KEY, belongs_to INTEGER NOT NULL, category VARCHAR(100) NOT NULL, price VARCHAR(100) NOT NULL, seat_f VARCHAR(100) NOT NULL, seat INTEGER NOT NULL, row INTEGER NOT NULL)');
    
    // Debug – for device testing ticket views
    //db.execute("INSERT INTO purchases VALUES (1, 'Test film', 'Fram Kino', 113, 6675485, 'eb16237845', '2012-03-16', '17:30:00', '2012-03-07', '21:35:45', 'SAL 1')");
    //db.execute("INSERT INTO tickets VALUES (1, '6675485', 'Voksen', '90.00', 'Rad 5, sete 4', '4', '5')");
    //db.execute("INSERT INTO tickets VALUES (2, '6675485', 'Voksen', '90.00', 'Rad 5, sete 5', '5', '5')");

    db.close();
};

exports.getPlaces = function(callback) {
	debug('get places');

	var db = Ti.Database.open('eBillett');
	//var result = db.execute('SELECT id,name,pid,type FROM places');
	var result = db.execute('SELECT * FROM places');
	
	var data = [];
	
	if(result.isValidRow()) {
        while(result.isValidRow()) {
            var obj = {
				id: result.fieldByName('id'),
				name: result.fieldByName('name'),
				pid: result.fieldByName('pid'),
				type: result.fieldByName('type'),
				hasmobile: result.fieldByName('hasmobile')
			};

			var place = new Place(obj.id, obj.name, obj.pid, obj.type, obj.hasmobile);
			
			data.push(place);

			result.next();
		}
	}

	result.close();
	db.close();

	if(callback) {
		callback(data);
	}

	return data;

	// Dev
	//var empty;
	//callback(empty);
};

exports.savePlace = function(place, callback) {
	debug('saving: ' + place.name);

	var db = Ti.Database.open('eBillett');
    db.execute('INSERT INTO places (name, pid, type, hasmobile) VALUES (?,?,?,?)', place.name, place.pid, place.type, place.hasmobile);
	db.close();

	callback(1);
};

exports.deletePlace = function(place) {
	debug('deleting: ' + place.name);

	var db = Ti.Database.open('eBillett');
	db.execute('DELETE FROM places WHERE pid = ?', place.pid);
	db.close();
};

exports.getPurchases = function(userid, callback) {
	
	debug('get purchases for: ' + userid);

	var db = Ti.Database.open('eBillett');
	
	var result = db.execute('SELECT * FROM purchases WHERE user = ?', userid);
	
	var data = [];
	
	if(result.isValidRow()) {
        while(result.isValidRow()) {
            var obj = {
				id: result.fieldByName('id'),
				title: result.fieldByName('title'),
				place: result.fieldByName('place'),
				pid: result.fieldByName('pid'),
				receipt_id: result.fieldByName('receipt_id'),
				utref: result.fieldByName('utref'),
				fdato: result.fieldByName('fdato'),
				fkl: result.fieldByName('fkl'),
				dato: result.fieldByName('dato'),
				kl: result.fieldByName('kl'),
				showroom: result.fieldByName('showroom'),
			};

			var purchase = new Purchase(obj);
			
			data.push(purchase);

			result.next();
		}
	}

	result.close();
	db.close();

	debug('found locally stored purchases: ' + data.length);

	if(callback) {
		callback(data);
	}

	return data;

}

exports.getTickets = function(receipt_id) {
	
	debug('get tickets');

	var db = Ti.Database.open('eBillett');
	
	var result = db.execute('SELECT * FROM tickets WHERE belongs_to = ?', receipt_id);
	
	var data = [];
	
	if(result.isValidRow()) {
        while(result.isValidRow()) {
            var obj = {
				id: result.fieldByName('id'),
				category: result.fieldByName('category'),
				price: result.fieldByName('price'),
				seat_f: result.fieldByName('seat_f'),
				seat: result.fieldByName('seat'),
				row: result.fieldByName('row')
			};

			//var purchase = new Purchase(obj);
			
			//data.push(purchase);

			data.push(obj);

			result.next();
		}
	}

	result.close();
	db.close();


	return data;

}

exports.savePurchase = function(obj, userid, callback) {

	var db = Ti.Database.open('eBillett');
	db.execute('INSERT INTO purchases (user, title, place, pid, receipt_id, utref, fdato, fkl, dato, kl, showroom) VALUES (?,?,?,?,?,?,?,?,?,?,?)', userid, obj.tittel, obj.sted, obj.partner_id, obj.receipt_id, obj.utref, obj.fdato, obj.fkl, obj.dato, obj.kl, obj.sted);

	db.close();

	callback();

}

exports.saveTicket = function(obj, belongs_to) {

	var db = Ti.Database.open('eBillett');
	db.execute('INSERT INTO tickets (belongs_to, category, price, seat_f, seat, row) VALUES(?,?,?,?,?,?)', belongs_to, obj.kategori, obj.pris, obj.plassering, obj.sete, obj.rad);

	db.close();

}