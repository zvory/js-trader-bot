var net = require('net');
var ml = require('./marketLogic');
var bs = require('./createMessage');

var client = new net.Socket();
var HOST = 'production';
var PORT = 25000;


var logic = new ml.MarketLogic(); 

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

function handleData (data) {
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
        logic.orders.out(parsed.order_id);
    }
    // Trade
    if (parsed.type.match(/trade/i)) {
        //console.log(parsed.type);
    }
    // Open
    if (parsed.type.match(/open/i)) {
        setInterval(bot, 10);

    }
    // Close
    if (parsed.type.match(/close/i)) {
        clearInterval(botreset);

    }
    // Book
    if (parsed.type.match(/book/i)) {
        logic.update(parsed); 
    }
    // Ack 
    if (parsed.type.match(/ack/i)) {
        logic.orders.ack(parsed.order_id);
    }
    // Fill
    if (parsed.type.match(/fill/i)) {
        logic.orders.fill(parsed.order_id, parsed.size);
        logic.assets.updateAssets(parsed.symbol, parsed.dir, parsed.size);
    }
    // Out
    if (parsed.type.match(/out/i)) {
        logic.orders.out(parsed.order_id);
    }
}

	
// Add a 'close' event handler to this instance of socket
client.on('close', function(data) {
    console.log(data);
    console.log('CLOSED: ' + client.remoteAddress +' '+ client.remotePort);

});


function sendRequest (order) {
    client.write(JSON.stringify(order) + "\n");
}

function bot () {
    var actions = logic.getActions();
    actions.forEach(function (action) {
    sendRequest(action);
    });
    
}

var botreset = setInterval(bot, 10);
