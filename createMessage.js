var MAX_INT = 2147483647;

var Books = function() {
	this.books  {
		BOND: "bond undefined",
		VALBZ: "valbz",
		VALE: false,
		GS: false,
		MS: false,
		WFC: false,
		XLF: false
	}
}

Books.prototype.updateBook = function(book) {
	this.books[book.type] = book;
}

Books.prototype.getBook = function(type) {
	return this.books[type];
}

FairPrices.prototype.getPrices = function () {
	var array = [];
	for (var i in this.prices) {
		array.push({symbol: i, price: this.prices[i]});
	}
	return array;
}

var updateFair = function(fairprice, book) {
	var highestBuy = 0;
	var lowestSell = 0;
	var buys = book.buy;
	var sells = book.sell;
	var symb = book.symbol;
	highestBuy = buys.reduce(function(current, order) {
		return Math.max(current, order[0]);
	}, 0);
	lowestSell = sells.reduce(function(current, order) {
		return Math.min(current, order[0]);
	}, MAX_INT);
	fairprice.prices[symb] = [highestBuy, lowestSell];
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
	this.orders = {};// each element will be a tuple, with order object, and livestate
}

OurOrders.prototype.ack = function(id) {
    this.orders[id].live = true;
}



OurOrders.prototype.add






module.exports.FairPrices = FairPrices;
module.exports.updateFair = updateFair;
module.exports.Foo = Foo;
module.exports.convert = convert;
module.exports.cancel = cancel;
module.exports.sell = sell;
module.exports.buy = buy;
