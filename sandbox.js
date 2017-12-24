var events = require('events')
var eventEmitter = new events.EventEmitter //is constructor
var util = require('util');
//console.log(events)

// function test() {
// 	this.name = "name";
// 	console.log(this.name);
// }

var mock = {
	event: function(){
			this.emit('ready')
			}, //upon instantiation, must emit event
	test: function(){
		this.name="name2";
		//this.emit = events.emit() // doesn't work because not inherited
		console.log(this.name);
	}
};
util.inherits(mock.event, events.EventEmitter);

//figure out how to inherit from other constructor function...
//var instance = new mock.test()
var instance = new mock.event() //which can be inherited
var instance2 = new mock.event()
instance.on('ready',()=>{console.log('test')}) // u probably need to use util here, because emit doesnt work
instance.emit('ready')


var placeh = function() {
	this.name = "testfunc"
	this.func = () => {console.log('function executed')}
}

var testF = new placeh()
testF.func();

var testModel = { //this is a literal
	func: new function() { // directly instatiate an instance of an object (With this etc.)
		console.log("func executed");
		this.method = function(){ //this only works on 
			console.log('method called');
		}
	}
}

testModel.func
testModel.func.method




