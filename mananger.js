var express = require('express');
var app = express();
var gpio = require('rpi-gpio');

var gpioPORT = 7;
var status = false;
var devices = [{'port':1, 'description':'Aquecedor', 'active':true, 'status':status},
		{'port':2, 'description':'Unknown', 'active':false, 'status':false},
		{'port':3, 'description':'Unknown', 'active':false, 'status':false},
		{'port':4, 'description':'Unknown', 'active':false, 'status':false},
		{'port':5, 'description':'Unknown', 'active':false, 'status':false},
		{'port':6, 'description':'Unknown', 'active':false, 'status':false},
		{'port':7, 'description':'Unknown', 'active':false, 'status':false},
		{'port':8, 'description':'Unknown', 'active':false, 'status':false}];


function write() {
    gpio.write(gpioPORT, false, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
} 

app.get('/',function(req,res){
	res.send('Pi working...');
});

app.get('/on/:id',function(req,res){
	gpio.setup(gpioPORT, gpio.DIR_OUT, write);
	status = true;
	var device = devices[req.params.id];
	device.status = true;
	console.log("Ligar dispositivo "+req.params.id);
	res.send(device);
});


app.get('/off/:id',function(req,res){
//	gpio.destroy(function(){
//	console.log('off');
//	});
	var device = devices[req.params.id];
	device.status = false;
	status = false;
	res.send(device);
});

app.get('/devices', function(req,res){
	res.send(devices);
});


app.listen(3000);
console.log('pi lestinning');
