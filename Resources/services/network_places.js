var Place = require('models/Place');

exports.get = function(callback) {
	
	var url = 'http://www.nyan.no/dev/places.php';

	var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
			debug("searchTickets, ERROR " + e.error);
				if(callback) {
					callback(null);
				}
		};

		xhr.onload = function()
			{
				if(this.status === 200) {
					
					debug('net.places.get, responseText' + this.responseText);
					try {
						var returnData = JSON.parse(this.responseText);
						
						if(callback) {
							callback(returnData);
						}
						
					} catch(E) {
						debug('Exception in net.places.get: ' + E.description);
						if(callback) {
							callback(null);
						}
					}
			}
		};
};