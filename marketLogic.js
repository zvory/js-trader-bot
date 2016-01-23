var cm = require("./createMessage");
var MAX_INT = 2147483647;
var types = ["BOND","VALBZ","VALE","GS","MS","WTC","XLF"];
var threshold = 2;

var MarketLogic = function() {
	this.books = new Books();
	this.orders = new OurOrders();

	var open = function() {return true};
	var close = function() {return true};
}

MarketLogic.prototype.update = function(book) {
	// logic for moving average
	this.books.updateBook(book);
}

MarketLogic.prototype.getActions = function() {
    var actions = [];
    var symb = types [3];
	var highSell = this.books.getCurrBook(symb).sell[0];
	var lowBuy = this.books.getCurrBook(symb).buy[0];

	if (highSell && highSell[0] <= this.books.getFairValue(symb) + 1 ) {
        console.log("buy");
		actions.push (cm.buy(symb, highSell[0], highSell[1]));
	}
    else if (lowBuy && lowBuy[0] >= this.books.getFairValue(symb) + 1) 
    {
        console.log("sell");
        actions.push(cm.sell(symb, lowBuy[0], lowBuy[1]));
    }

	return actions; 
}


// stores an object containing an array of at most one hu ndread of the previous books for this type
var Books = function() {
	this.books = {
		BOND:[],
		VALBZ:[], 
		VALE: [],
		GS: [],
		MS: [],
		WFC: [],
		XLF: []
	};
};

Books.prototype.updateBook = function(book) {
	this.books[book.symbol].push(book);
	if (this.books[book.symbol].length > 100)
		this.books[book.symbol].shift();
};

Books.prototype.getCurrBook = function(type) {
	return this.books[type][this.books[type].length-1];
};

Books.prototype.getFairValue = function(type) {
	var highestBuys = this.getHighestBuys(type);
	var lowestSells = this.getLowestSells(type);
	var totalBuy = 0;
	var totalSell = 0;
	highestBuys.forEach(function(highest) {
		totalBuy += highest;
	});
	lowestSells.forEach(function(lowest) {
		totalSell += lowest;
	});
	return (totalBuy + totalSell)/(2 * highestBuys.length);
}

Books.prototype.getHighestBuys = function(type) {
	var typeBooks = this.books[type];
	typeBooks = typeBooks.map(function(element) {
		return element.buy[0][0];
	});
	return typeBooks;
}

Books.prototype.getLowestSells = function(type) {
	var typeBooks = this.books[type];
	typeBooks = typeBooks.map(function(element) {
		return element.sell[0][0];
	});
	return typeBooks;
}

Books.prototype.getCurrHighestBuys = function(type) {
	return this.getCurrBook(type).buy[0];
}

Books.prototype.getCurrLowestSell = function(type) {
	return this.getCurrBook(type).sell[0];
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


module.exports.MarketLogic = MarketLogic;
