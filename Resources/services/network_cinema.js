

exports.getCurrent = function(id, callback) {

	var url = 'http://dx.no/ebillett/dx_movies.php?p_id=' + id;

	debug('cinema.getCurrent: ' + url);

	var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
			debug("getCurrent movies, ERROR " + e.error);
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
					debug("current.get, server error " + this.status);
					if(callback) {
						callback(null);
					}
				} else if(this.status === 404) {
					debug("current.get, not found " + this.status);
					if(callback) {
						callback(null);
					}
				} else {
					debug("current.get, unknown " + this.status);
					if(callback) {
						callback(null);
					}
				}
				
			};

		xhr.setTimeout(5000);
		xhr.open('GET',url);
		xhr.send();
};
