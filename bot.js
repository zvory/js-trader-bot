var net = require('net');

var bs = require('./createMessage');

var client = new net.Socket();
var HOST = 'test-exch-nerve';
var PORT = 25000;


var book = new bs.FairPrices();

client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 

    var hello = {type:"hello", team:"NERVE"};
    client.write(JSON.stringify(hello) + "\n");


});


// Add a 'data' event handler to this instance of socket
client.on('data', function(data) {
    var stringed = data.toString();
    var strings = stringed.split("\n");

    strings.forEach(function (entry) {
        if (entry)
            handleData(entry);
    });

});

//FIX THIS LATER
function handleData (data) {
    var parsed = JSON.parse(data);

    // Initial Handshake
    if (parsed.type.match(/hello/i)) {
        console.log ("Server handshake complete");
    }
    // Error Handling
    if (parsed.type.match(/ERROR/i)) {
        //console.log("ERROR: " + parsed.error);
    }
    // Order Rejection
    if (parsed.type.match(/REJECT/i)) {
        //bs.orders.reject(parsed.order_id);
        //console.log("Reject: " + matched.order_id + " " + parsed.error);
    }
    // Trade
    if (parsed.type.match(/trade/i)) {
        //console.log(parsed.type);

    }
    // Open
    if (parsed.type.match(/open/i)) {

    }
    // Close
    if (parsed.type.match(/close/i)) {

    }
    // Book
    if (parsed.type.match(/book/i)) {
        //bs.updateBook(book, parsed); 
    }
    // Ack 
    if (parsed.type.match(/ack/i)) {
        //bs.orders.ack(parsed.order_id);
    }
    // Fill
    if (parsed.type.match(/fill/i)) {
        //bs.orders.fill(parsed.order_id, parsed.size);
    }
    // Out
    if (parsed.type.match(/out/i)) {
        //bs.order.out(parsed.order_id);

    }
}

	
    // Add a 'close' event handler to this instance of socket
client.on('close', function(data) {
    console.log(data);
    console.log('CLOSED: ' + client.remoteAddress +' '+ client.remotePort);

});


function makeBuyOrder (order) {

    client.write(order);
}

function bot () {


    console.log(book.getPrices());

}

setInterval(bot, 10);
