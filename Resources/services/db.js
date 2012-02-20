
var Place = require('models/Place');


// Bootstrap database
exports.bootstrap = function() {
    var db = Ti.Database.open('eBillett');
    db.execute('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY, name VARCHAR(16) NOT NULL, pid INTEGER NOT NULL, type VARCHAR(16) NOT NULL, hasmobile INTEGER NOT NULL)');
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