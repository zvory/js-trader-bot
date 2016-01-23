var MAX_INT = 2147483647;
var types = ["BOND","VALBZ","VALE","GS","MS","WTC","XLF"];
var threshold = 2;

var MarketLogic = function() {
	var books = new Books();
	var orders = new OurOrders();
}

MarketLogic.prototype.update = function(book) {
	// logic for moving average

	//
	this.books.updateBook(book);
}

MarketLogic.prototype.getActions = function() {
	for (type in types) {
		if () {

		}
	}
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
	
}

Books.prototype.getHighestBuys = function(type) {
	var typeBooks = this.books[type];
	type.map(function(element) {
		return element.buy.reduce();
	});
}

Books.prototype.getLowestSells = function(type) {
	
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