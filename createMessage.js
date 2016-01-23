var MAX_INT = 2147483647;

var Books = function() {
	this.books ={
		BOND:false,
		VALBZ:false, 
		VALE: false,
		GS: false,
		MS: false,
		WFC: false,
		XLF: false
	};
};

Books.prototype.updateBook = function(book) {
	this.books[book.symbol] = book;
};

Books.prototype.getBook = function(type) {
	return this.books[type];
};

var buy = function(symbol, price, size) {
	return new Foo("add", 
		parseInt((new Date().getTime() + "").slice(5)), 
		symbol.toUpperCase(), 
		"BUY", 
		price, 
		size);
}

var sell = function(symbol, price, size) {
	return new Foo("add", 
		parseInt((new Date().getTime() + "").slice(5)), 
		symbol.toUpperCase(), 
		"SELL", 
		price, 
		size);
}

var cancel = function(orderId) {
	return new Foo("cancel", orderId);
}

var convert = function(symbol, dir, size) {
	return new Foo("convert", 
		parseInt((new Date().getTime() + "").slice(5)), 
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


// add, remove, confirm ()
var OurOrders = function() {
	this.orders = {

	}; // each element will be a tuple, with order object, and livestate
} 

	OurOrders.prototype.ack = function(id) {
	if(this.orders[id])
		this.orders[id][0] = true;
}

OurOrders.prototype.add = function(foo) {
	this.orders[foo.order_id] = [false, foo];
}


OurOrders.prototype.out = function(id) {
	if(this.orders[id])
		delete this.orders[id];
}

OurOrders.prototype.fill = function(id, size) {
	if(this.orders[id])
		this.orders[id][1].size -= size;
}



module.exports.OurOrders = OurOrders;
module.exports.Foo = Foo;
module.exports.convert = convert;
module.exports.cancel = cancel;
module.exports.sell = sell;
module.exports.buy = buy;
module.exports.Books = Books;

