var MarketLogic = function() {

}


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

module.exports.Books = Books;