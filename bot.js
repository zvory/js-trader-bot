var net = require('net');

var HOST = '127.0.0.1';
var kekHOST = 'test-exch-NERVE';
var PORT = 20000;
// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    sock.write("HELLO NERVE");
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        if (data.match(/hello/)){
            console.log("Server handshake complete");
            updatePositions(data);
        }
        if (data.match(/ERROR/i)) {
            console.log("ERROR: " + data);
        }
        if (data.match(/REJECT/i)) {
            console.log("Reject: " + data);
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
