var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var path = require('path');


var mysocket = 0;
app.listen(8080);

function handler (request, response) {
    var file = __dirname + (request.url == '/' ? '/v4.final.html' : request.url);
//    var file = __dirname + (request.url == '/' ? '/v1.straight.html' : request.url);

    fs.readFile(file, function(error, data) {
        if (error) {
            response.writeHead(500);
            return response.end('Error loading index.html');
        }
        response.writeHead(200);
        response.end(data, 'utf-8');
    });
}

io.sockets.on('connection', function (socket) {
  console.log('index.html connected'); 
  mysocket = socket;});
 
//udp server on 4711
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
  //console.log("msg: " + msg); // nechcem furt vypisovat do CMD
  if (mysocket != 0) {
     mysocket.emit('field', "" + msg);
     mysocket.broadcast.emit('field', "" + msg);
  }
});
server.on("listening", function () {
  var address = server.address();
  console.log("udp server listening " + address.address + ":" + address.port);
});
 
 
server.bind(4711);