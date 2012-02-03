

exports.getCurrent = function(id, callback) {
	var url = 'http://dx.no/ebillett/dx_movies.php?p_id=' + id;

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
