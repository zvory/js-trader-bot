function FairPrices() {
	this.BOND = [0, Number.MAX_SAFE_INTEGER];
	this.VALBZ = [0, Number.MAX_SAFE_INTEGER];
	this.VALE = [0, Number.MAX_SAFE_INTEGER];
	this.GS = [0, Number.MAX_SAFE_INTEGER];
	this.MS = [0, Number.MAX_SAFE_INTEGER];
	this.WFC = [0, Number.MAX_SAFE_INTEGER];
	this.XLF = [0, Number.MAX_SAFE_INTEGER];
}

var update = function(fairprice, book) {
	var highestBuy = 0;
	var lowestSell = 0;
	var buys = book.buy;
	var sells = book.sell;
	var symb = book.symbol;
	highestBuy = buys.reduce(function(current, order) {
		return Math.max(current, order[]);
	}, 0;
	lowestSell = sells.reduce(function(current, order) {
		return Math.min(current, order[0]);
	}, Number.MAX_SAFE_INTEGER));
	fairprice[symb] = [highestBuy, lowestSell];
};

function buy(orderId, symbol, price, size) {
	return new Foo("add", 
		parseInt((new Date().getTime() + "").slice(5)), 
		symbol.toUpperCase(), 
		"BUY", 
		price, 
		size);
}

function sell(orderId, symbol, price, size) {
	return new Foo("add", 
		parseInt((new Date().getTime() + "").slice(5)), 
		symbol.toUpperCase(), 
		"SELL", 
		price, 
		size);
}

function cancel(orderId) {
	return new Foo("cancel", orderId);
}

function convert(symbol, dir, size) {
	return new Foo("convert", 
		parseInt((new Date().getTime() + "").slice(5)), 
		symbol.toUpperCase(), 
		dir.toUpperCase(), 
		"", 
		size);
}

function Foo(type, orderId, symbol, dir, price, size) {
	this.type = type;
	this.order_id = orderId;
	this.symbol = symbol;
	this.dir = dir;
	this.price = price;
	this.size = size;
}