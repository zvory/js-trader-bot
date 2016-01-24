var MAX_INT = 2147483647;

var buy = function(id, symbol, price, size) {
	return new Foo("add", 
		id, 
		symbol.toUpperCase(), 
		"BUY", 
		price, 
		size);
}

var sell = function(id, symbol, price, size) {
	return new Foo("add", 
		id, 
		symbol.toUpperCase(), 
		"SELL", 
		price, 
		size);
}

var cancel = function(orderId) {
	return {type:"cancel", order_id:orderId};
}

var convert = function(symbol, dir, size) {
	return new Foo("convert", 
		parseInt((new Date().getTime() + "").slice(6)), 
		symbol.toUpperCase(), 
		dir.toUpperCase(), 
		"", 
		size);
}

var Foo = function(type, orderId, symbol, dir, price, size) {
	this.type = type;
	this.order_id = orderId;
	this.symbol = symbol;
	this.dir = dir;
	this.price = price;
	this.size = size;
}

module.exports.Foo = Foo;
module.exports.convert = convert;
module.exports.cancel = cancel;
module.exports.sell = sell;
module.exports.buy = buy;
