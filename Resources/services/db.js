
var Place = require('models/Place');


// Bootstrap database
exports.bootstrap = function() {
    var db = Ti.Database.open('eBillett');
    db.execute('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY, name VARCHAR(16) NOT NULL, pid INTEGER NOT NULL, type VARCHAR(16) NOT NULL, hasmobile INTEGER NOT NULL)');
    db.close();
};

exports.getPlaces = function(callback) {
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

	//callback(data);

	// Dev
	var empty;
	callback(empty);
};