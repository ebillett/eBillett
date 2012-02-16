
function Place(id, name, pid, type, hasmobile) {
	this.id = id;
	this.name = name;
	this.pid = pid;
	this.type = type;
	this.hasmobile = hasmobile*1;
}

module.exports = Place;