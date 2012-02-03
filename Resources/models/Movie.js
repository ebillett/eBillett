
function Movie(item) {
	this.title = item.title;
	this.length = item.length;
	this.age = item.age;
	this.poster = item.poster_url;
	this.id = item.id;
	this.info = item.info_url;
}

module.exports = Movie;