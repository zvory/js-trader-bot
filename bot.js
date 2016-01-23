var net = require('net');
//var bs = require('buysell.js');

var client = new net.Socket();
var HOST = 'test-exch-NERVE';
var PORT = 20000;


client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 

console.log(client.address());
    client.write('HELLO NERVE');

    client.write('{"type": "hello", "team": "NERVE"}');
    console.log('{"type": "hello", "team": "NERVE"}');


});


// Add a 'data' event handler to this instance of socket
client.on('data', function(data) {
    
    console.log("msg" + data);
    var parsed = JSON.parse(data);

    // Initial Handshake
    if (parsed.type.match(/hello/i)) {
        console.log ("Server handshake complete");

    }
    // Error Handling
    if (parsed.type.match(/ERROR/i)) {
        console.log("ERROR: " + parsed.error);
    }
    // Order Rejection
    if (parsed.type.match(/REJECT/i)) {
        console.log("Reject: " + matched.order_id + " " + parsed.error);
    }
    // Trade
    if (parsed.type.match(/trade/i)) {
        console.log(parsed.type);

    }
    // Open
    if (parsed.type.match(/open/i)) {

    }
    // Close
    if (parsed.type.match(/close/i)) {

    }
    // Book
    if (parsed.type.match(/book/i)) {

    }
    // Ack 
    if (parsed.type.match(/ack/i)) {

    }
    // Fill
    if (parsed.type.match(/fill/i)) {

    }
    // Out
    if (parsed.type.match(/out/i)) {

    }
    
    console.log("The exchange replied: " + data);
});


	
    // Add a 'close' event handler to this instance of socket
client.on('close', function(data) {
    console.log(data);
    console.log('CLOSED: ' + client.remoteAddress +' '+ client.remotePort);

});
    
