var MAX_INT = 2147483647;

var FairPrices = function() {
	this.prices = {
		BOND: [0, MAX_INT],
		VALBZ: [0, MAX_INT],
		VALE: [0, MAX_INT],
		GS: [0, MAX_INT],
		MS: [0, MAX_INT],
		WFC: [0, MAX_INT],
		XLF: [0, MAX_INT]
	}
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
	this.orders = {

	}; // each element will be a tuple, with order object, and livestate
} 

OurOrders.prototype.ack = function(id) {
	if(this.orders[id])
		this.orders[id] = [true, this.orders[id][1]];
}

OurOrders.prototype.add = function(foo) {
	this.orders[foo.order_id] = [false, foo];
}}


OurOrders.prototype.out = function(id) {
	if(this.orders[id])
		delete this.orders[id];
}

OurOrders.prototype.fill = function(id, size) {
	if(this.orders[id])
		this.orders[id][1].size -= size;
}



module.exports.OurOrders = OurOrders;
module.exports.FairPrices = FairPrices;
module.exports.updateFair = updateFair;
module.exports.Foo = Foo;
module.exports.convert = convert;
module.exports.cancel = cancel;
module.exports.sell = sell;
module.exports.buy = buy;