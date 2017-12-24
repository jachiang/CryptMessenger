var events = require('events');
var eventEmitter = new events.EventEmitter();

//https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm


// listener #1
var listner1 = function listner1() {
   //console.log('listner1 executed.');
}

// listener #2
var listner2 = function listner2() {
  //console.log('listner2 executed.');
}

var listner3 = function() {
	console.log('listner3 executed')
}

//eventEmitter.addListener('connection', listner1);
//eventEmitter.addListener('connection', listner2);
eventEmitter.on('connection', listner1);
eventEmitter.on('connection', listner2);
eventEmitter.on('connection', listner3);


var eventListeners = require('events').EventEmitter.listenerCount
   (eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

eventEmitter.emit('connection');
