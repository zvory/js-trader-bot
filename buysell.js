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