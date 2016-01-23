var FairPrices = function() {
	this.prices = {
		BOND: [0, -1],
		VALBZ: [0, -1],
		VALE: [0, -1],
		GS: [0, -1],
		MS: [0, -1],
		WFC: [0, -1],
		XLF: [0, -1]
	}
}

FairPrices.prototype.getPrices = function () {
	var array = [];
	for (var i in this.prices) {
		array.push({symbol: i, price: this.price[i]});
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
	}, Number.MAX_SAFE_INTEGER);
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