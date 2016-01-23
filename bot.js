var net = require('net');
var bs = require('buysell');

var HOST = 'test-exch-NERVE';
var PORT = 25000;
// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    sock.write("HELLO NERVE");
    

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
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
  sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);


function updatePositions (data){
    console.log("got data, not handled");
}


console.log('bot listening to' + HOST +':'+ PORT);

