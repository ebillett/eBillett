exports.get = function(userid, localPurchases, callback) {
	var url = 'https://ma01.dx.no/dx_tickets.php';

	var storedTickets = '';

	if(localPurchases.length > 0) {

		_.each(localPurchases, function(obj) {
			storedTickets = storedTickets + obj + ',';
		});

		storedTickets = storedTickets.substring(0, storedTickets.length-1);

		debug('stored tickets: ' + storedTickets);
	}

	debug('tickets.get: ' + url);


	var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
			debug("tickets.get, ERROR " + e.error);
				if(callback) {
					callback(null);
				}
		};

		xhr.onload = function()
			{
				if(this.status === 200) {
					
					var returnData = JSON.parse(this.responseText);
						
						if(callback) {
							callback(returnData);
						}
				
				} else if(this.status === 500) {
					debug("tickets.get, server error " + this.status);
					if(callback) {
						callback(null);
					}
				} else if(this.status === 404) {
					debug("tickets.get, not found " + this.status);
					if(callback) {
						callback(null);
					}
				} else {
					debug("tickets.get, unknown " + this.status);
					debug('response: ' + this.responseText);

					if(callback) {
						callback(null);
					}
				}
				
			};

		xhr.setTimeout(5000);
		xhr.open('POST',url);

		xhr.send({
			'profil_id': userid,
			'stored_tickets': storedTickets
		});
};