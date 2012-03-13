function debug(text) {
	if(DEBUG) {
		//Ti.API.debug('>>>>  ' + text);
		//Ti.API.trace('>>>>  ' + text);
		Ti.API.info('>>>>  ' + text);
		//alert(text);
	}
}