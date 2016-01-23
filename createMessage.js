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

var buy = function(orderId, symbol, price, size) {
	return new Foo("add", 
		parseInt((new Date().getTime() + "").slice(5)), 
		symbol.toUpperCase(), 
		"BUY", 
		price, 
		size);
}

var sell = function(orderId, symbol, price, size) {
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

module.exports.FairPrices = FairPrices;
module.exports.updateFair = updateFair;
module.exports.Foo = Foo;
module.exports.convert = convert;
module.exports.cancel = cancel;
module.exports.sell = sell;
module.exports.buy = sell;