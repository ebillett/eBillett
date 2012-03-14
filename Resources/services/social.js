var FACEBOOK_LANDING = 'beta.dx.no/facebook.php?receipt_id=';

exports = {

	bootstrap: function() {
	
		Ti.Facebook.appid = '412856565398124';
		Ti.Facebook.permissions = ['publish_stream'];

	},

	checkAuth: function() {

		return Ti.Facebook.loggedIn;

	},

	loginBtn: function() {

		var fb = Ti.Facebook.createLoginButton({
			bottom : 50,
			style : Ti.Facebook.BUTTON_STYLE_WIDE
		});

		return fb;

	},

	postToWall: function(ticket) {

		debug('post to wall: ');
		debug(JSON.stringify(ticket));

		var fbUser;
		this.getUserInfo(function(obj) {
			fbUser = JSON.parse(obj);
			

			var linkUrl = FACEBOOK_LANDING + ticket.receipt_id + '&profil_id=' + fbUser.id;
			debug(linkUrl);
			var date = Date.parse(ticket.fdato);
			date = date.toString('ddd dd. MMM') + ' kl.: ' + ticket.fkl;
			debug(date);

			var data = {
			    link : linkUrl,
			    name : ticket.title,
			    message : "Har kjøpt billetter",
			    caption : date,
			    picture : "http://nyan.no/dev/ebillett.png",
			    description : "Kjøp billetter direkte på telefonen."
			};

			Titanium.Facebook.dialog("feed", data, function(e) {
	    		if(e.success && e.result) {
	        		debug("Success! New Post ID: " + e.result);
	        		Ti.App.fireEvent('fb:postSuccess');
	    		} else {
	        		if(e.error) {
	            		alert(e.error);
	        		} else {
	            		debug("User canceled dialog.");
	        		}
	    		}
			});
		});

	},
	getUserInfo: function(callback) {
		debug('Social, get user info');

		Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
		    if (e.success) {

		    	debug(JSON.stringify(e.result));
		        
		        callback(e.result);
		        return e.result;

		    } else if (e.error) {
		        debug(e.error);
		    } else {
		        debug('Unknown response');
		    }
		});
	}

}