
exports.test = function() {
	alert('test');
}


exports.register = function(user, callback) {

	var url = 'https://ma01.dx.no/dx_register.php';

	debug('user.register: ' + url);

	debug('user: ' + user.email + ' / ' + user.password);

	var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
			debug("user.register, ERROR " + e.error);
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
					debug("user.register, server error " + this.status);
					if(callback) {
						callback(null);
					}
				} else if(this.status === 404) {
					debug("user.register, not found " + this.status);
					if(callback) {
						callback(null);
					}
				} else {
					debug("user.register, unknown " + this.status);
					if(callback) {
						callback(null);
					}
				}
				
			};

		xhr.setTimeout(5000);
		xhr.open('POST',url);
		xhr.send({
			'epost': user.email,
			'password': user.password
		});
};

exports.login = function(user, callback) {

	var url = 'https://ma01.dx.no/dx_login.php';

	debug('user.login: ' + url);

	debug('user: ' + user.email + ' / ' + user.password);

	var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
			debug("user.login, ERROR " + e.error);
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
					debug("user.login, server error " + this.status);
					if(callback) {
						callback(null);
					}
				} else if(this.status === 404) {
					debug("user.login, not found " + this.status);
					if(callback) {
						callback(null);
					}
				} else {
					debug("user.login, unknown " + this.status);
					debug('response: ' + this.responseText);

					if(callback) {
						callback(null);
					}
				}
				
			};

		xhr.setTimeout(5000);
		xhr.open('POST',url);
		xhr.send({
			'username': user.email,
			'password': user.password
		});
};