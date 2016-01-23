

var MarketLogic = function() {
	var books = new Books();
}

MarketLogic.prototype.update = function(book) {
	this.books.updateBook(book);
}

MarketLogic.prototype.decision


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