
var socket = io.connect('http://localhost:8080/');
// my stream
socket.on('field', function (data) {
//	console.log(data);
//	$("#field").html(data);

	var n = data.indexOf("?>") + 2;
	var output = [data.slice(0, n), "<root>", data.slice(n),"</root>"].join('');
//	console.log(output);

	var xmlDoc = $.parseXML( output );
	var xml = $( xmlDoc );
	var value1 = xml.find("Gravity1");
	var value2 = xml.find("Gravity3");
	var value3 = xml.find("Proximity");
	var value4 = xml.find("LightIntensity");

	if(value1.length) {
		var steering = Math.round(value1.text());
		if(steering <= -2) {
			keyRight = true;
		} else if(steering >= 2) {
			keyLeft = true;
		} else {
			keyLeft = false;
			keyRight = false;
		}
	}

	if(value2.length && !keySlower) {
		var acceleration = Math.round(value2.text());
		keyFaster = acceleration >= 4;
	} else if(keySlower) {
		keyFaster = false;
	}


	if(value3.length) {
		var breaking = Math.round(value3.text());
		console.log(breaking);
		console.log(keySlower);
		keySlower = breaking < 2;
	}

	if(value4.length) {
		fogDensity = 40 - (Math.round(value4.text()) / 7 );
	}
});
