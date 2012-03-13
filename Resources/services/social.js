var FACEBOOK_LANDING = 'http://erlend.ebillett.test.dx.no/index.php?page=facebook&utref=';

exports = {

	bootstrap: function() {
	
		Ti.Facebook.appid = '412856565398124';
		Ti.Facebook.permissions = ['publish_stream'];

	},

	checkAuth: function() {

		return Ti.Facebook.loggedIn;

	},

	postToWall: function(data) {

		if(!data) {
			var data = {
			    link : "http://www.mrtn.no",
			    name : "The Hunger Games på Fram Kino",
			    message : "Har kjøpt billetter",
			    caption : "dd/mm, kl. xx:xx",
			    picture : "http://developer.appcelerator.com/assets/img/DEV_titmobile_image.png",
			    description : "Kjøp billetter direkte på telefonen."
			};
		}

		Titanium.Facebook.dialog("feed", data, function(e) {
    		if(e.success && e.result) {
        		//alert("Success! New Post ID: " + e.result);
        		Ti.App.fireEvent('fb:postSuccess');
    		} else {
        		if(e.error) {
            		alert(e.error);
        		} else {
            		//alert("User canceled dialog.");
        		}
    		}
		});

	}
}