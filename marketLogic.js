var cm = require("./createMessage");
var MAX_INT = 2147483647;
var types = ["BOND","VALBZ","VALE","GS","MS","WFC","XLF"];
var threshold = 2;

var MarketLogic = function() {
	this.books = new Books();
	this.orders = new OurOrders();
    this.assets = new Assets();

	var open = function() {return true};
	var close = function() {return true};
}

var Assets = function () {
    this.assets = {};
    for (var tag in types)
        this.assets[types[tag]] = 0;
}

Assets.prototype.updateAssets =  function (symbol, dir, size){
    var sign;
    if (dir == "BUY")
        sign = 1;
    else
        sign = -1;
    this.assets[symbol] +=Number(size) * sign;
}

MarketLogic.prototype.update = function(book) {
	// logic for moving average
	this.books.updateBook(book);
}
MarketLogic.prototype.getActions = function() {
    var actions = [];


    types.forEach(function (symb) {

        var highSell = this.books.getCurrBook(symb).sell[0];
        var lowBuy = this.books.getCurrBook(symb).buy[0];

        var fivedays = this.books.getAverage(5, symb);
        var thirtydays = this.books.getAverage(30, symb);
        var fairValue = this.books.getFairValue(symb);

        if (fivedays > thirtydays) {
        	actions.push(cm.sell(Math.floor (Math.random() * MAX_INT), symb, fivedays + 1, 1));
        }
        else {
        	actions.push(cm.buy(Math.floor (Math.random() * MAX_INT), symb, fivedays - 1, 1))
        }


        /*if (highSell && lowBuy && highSell[0] && lowBuy[0] && highSell[0]  - 1> lowBuy[0]) {
        	var buy= false;
        	var sell=false;
        	var ord = this.orders.orders;
            var time = new Date().getTime();
        	for (var i in this.orders.orders){
        		if (ord.hasOwnProperty(i) && ord[i][1].symbol == symb){
                    actions.push ({type:"cancel", order_id:ord[i][1].order_id});
                    this.orders.out(ord[i][1].order_id);
        		}

        	}
        	if (true) {
                var purchase = cm.buy(Math.floor (Math.random() * MAX_INT)
        			, symb, lowBuy[0] , 1);
        		actions.push (purchase);
                this.orders.add(purchase);
        	}
        	if (true) {
                var sale = cm.sell(Math.floor (Math.random() * MAX_INT),
        			symb, highSell[0] , 1);
        		actions.push (sale);
                this.orders.add(sale);
        	}
        }*/
       
    }.bind(this));

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

Books.prototype.getAverage = function(days, type) {
	var counter = 0;
	var counter2 = 0;
	var lowest = this.getLowestSells(type);
	var highest = this.getHighestBuys(type);
	for (var i = this.books[type].length-days; i < this.books[type].length; i++) {
		if (i >= 0 && lowest[i] != -1 && highest[i] != -1) {
			counter2 += lowest[i] + highest[i];
			counter ++;
		}
	}
	return Math.round(counter2/(2 * counter));
}

Books.prototype.updateBook = function(book) {
	this.books[book.symbol].push(book);
	if (this.books[book.symbol].length > 1000)
		this.books[book.symbol].shift();
};

Books.prototype.getCurrBook = function(type) {
	return this.books[type][this.books[type].length-1];
};
Books.prototype.getLastBook = function(type) {
	return this.books[type][this.books[type].length-2];
};

Books.prototype.getFairValue = function(type) {
	var highestBuys = this.getHighestBuys(type);
	var lowestSells = this.getLowestSells(type);
	var totalBuy = 0;
	var totalSell = 0;
	var counter = 0;
	for (var i = 0; i < highestBuys.length; i++) {
		if (highestBuys[i] != -1 && lowestSells != -1) {
			totalBuy += highestBuys[i];
			totalSell += lowestSells[i];
			counter ++;
		}
	}
	return (totalBuy + totalSell) / (2 * counter);
}

Books.prototype.getHighestBuys = function(type) {
	var typeBooks = this.books[type];
	typeBooks = typeBooks.map(function(element) {
		if (element.buy[0])
			return element.buy[0][0];
		return -1;
	});
	return typeBooks;
}

Books.prototype.getLowestSells = function(type) {
	var typeBooks = this.books[type];
	typeBooks = typeBooks.map(function(element) {
		if (element.sell[0])
			return element.sell[0][0];
		else
			return -1;
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
    if (this.orders[id])
        delete this.orders[id];
}

OurOrders.prototype.fill = function(id, size) {
	if(this.orders[id])
		this.orders[id][1].size -= size;

}


module.exports.MarketLogic = MarketLogic;
