var Place = require('models/Place');

exports.get = function(callback) {
	
	var url = 'http://www.nyan.no/dev/places.json';

	var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
			debug("searchTickets, ERROR " + e.error);
				if(callback) {
					callback(null);
				}
		};

		xhr.onload = function()
			{
				debug('onLoad from network/place');
				if(this.status === 200) {
					
					var returnData = JSON.parse(this.responseText);
						
						if(callback) {
							callback(returnData);
						}
				
				} else if(this.status === 500) {
					debug("places.get, server error " + this.status);
					if(callback) {
						callback(null);
					}
				} else if(this.status === 404) {
					debug("places.get, not found " + this.status);
					if(callback) {
						callback(null);
					}
				} else {
					debug("places.get, unknown " + this.status);
					if(callback) {
						callback(null);
					}
				}
				
			};

		xhr.setTimeout(5000);
		xhr.open('GET',url);
		xhr.send();
};