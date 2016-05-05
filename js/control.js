
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
	var value1 = xml.find("Gravity2");
	var value2 = xml.find("Gravity3");
	var value3 = xml.find("Proximity");
	var value4 = xml.find("LightIntensity");

	setNewValues({
		"value1": value1,
		"value2": value2,
		"value3": value3,
		"value4": value4
	});
});

function setNewValues(values) {
	if(values.value1.length) {
		var steering = Math.round(values.value1.text());
		console.log(steering);
		if(steering >= 2) {
			keyRight = true;
		} else if(steering <= -2) {
			keyLeft = true;
		} else {
			keyLeft = false;
			keyRight = false;
		}
	}

	if(values.value2.length && !keySlower) {
		var acceleration = Math.round(values.value2.text());
		keyFaster = acceleration >= 4;
	} else if(keySlower) {
		keyFaster = false;
	}


	if(values.value3.length) {
		var breaking = Math.round(values.value3.text());
		keySlower = breaking < 2;
	}

	if(values.value4.length) {
		fogDensity = 40 - (Math.round(values.value4.text()) / 7 );
	}
}