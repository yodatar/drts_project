var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var path = require('path');
var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var parseString = require('xml2js').parseString;
const util = require('util');


var mysocket = 0;
app.listen(8080);

function handler (request, response) {
    var file = __dirname + (request.url == '/' ? '/index.html' : request.url);
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
  mysocket = socket;
});
 
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



btSerial.on('found', function(address, name) {
    btSerial.findSerialPortChannel(address, function(channel) {
        if(true) {
            btSerial.connect(address, channel, function() {
                console.log('connected: ' + name + " - " + address + " - " + channel);

                server.on("message", function (data) {
                    var json;
                    var n = data.indexOf("?>") + 2;
                    var xmlRaw = ["<root>", data.slice(n),"</root>"].join('');

                    parseString(xmlRaw, function (err, res) {
                        json = res.root;
                    });
                    var command = getCommand(json);

                    if(command) {
                        btSerial.write(new Buffer(command, 'utf-8'), function(err, bytesWritten) {
                            if (err) console.log(err);
                        });
                    }
                });

                btSerial.on('data', function(buffer) {
                    console.log(buffer.toString('utf-8'));
                });
            }, function () {
                console.log('cannot connect');
            });

            // close the connection when you're ready
            btSerial.close();
        }
    }, function() {
        console.log('found nothing');
    });
});

btSerial.inquire();

server.bind(4711);

function getCommand(json) {

    if(util.isNullOrUndefined(json.Gravity)) return false;

    var acceleration = Math.round(json.Gravity[0].Gravity3[0]*25);
    var direction = (acceleration > 0) ? 'A' : 'D';
    acceleration = Math.abs(acceleration);

    var steering = Math.round(json.Gravity[0].Gravity2[0]);

    if(steering < 0) {
        var leftMotor = acceleration;
        var rightMotor = acceleration - acceleration*Math.abs(steering)/10;
    } else if(steering > 0) {
        var leftMotor = acceleration - acceleration*Math.abs(steering)/10;
        var rightMotor = acceleration;
    } else {
        var leftMotor = acceleration;
        var rightMotor = acceleration;
    }

    return direction + pad3(Math.round(leftMotor)) + pad3(Math.round(rightMotor));
}

function pad3(num) {
    var s = num+"";
    while (s.length < 3) s = "0" + s;
    return s;
}