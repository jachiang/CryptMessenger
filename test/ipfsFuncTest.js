const assert = require('chai').assert;
const sinon = require('sinon')
const ipfsFunc = require('../ipfsFunctions.js')
var events = require('events')
var util = require('util');
var ipfs = { //want ot mock this out later
    IPFS: require('ipfs'),
    ipfsConfig: require('../ipfsConfig.js'),
    nodeState: {}
}

describe('NodeStart', function(){

	//constructing our ipfs mock
	var ipfsMock = {
  	IPFS: function(){}, //only function object like this can be wrapped with sinon.spy
  	ipfsConfig: {},
  	nodeState: {}
	} //needs to inherit eventEmitter
	util.inherits(ipfsMock.IPFS, events.EventEmitter); //eventEmitter has weird prototype inheritance

	it('should create a new IPFS()', function(){
		//https://stackoverflow.com/questions/27278655/how-do-i-use-sinon-js-to-mock-spy-object-mentioned-inside-the-javascript-functio
    var ipfsSpy = sinon.spy(ipfsMock,"IPFS"); //now ipfsMock.IPFS is wrapped
    var callback = function(){}
		var cb = function() {}
 		var ipfsReturn = ipfsFunc.nodeStart(ipfsMock, cb, callback);
 		//ipfsReturn.nodeState.emit('ready');
 		//then you need to do
		//assert.ok(ipfsMock.IPFS.calledWithNew()); //Perhaps redefine spy each time...
    assert.ok(ipfsSpy.calledWithNew())
    ipfsMock.IPFS.restore();
  });

	it('should create a new IPFS() with "ipfsConfig" as argument', function(){
    var ipfsSpy = sinon.spy(ipfsMock,"IPFS"); //now ipfsMock.IPFS is wrapped
    var callback = function() {}
		var cb = function() {}
 		var ipfsReturn = ipfsFunc.nodeStart(ipfsMock, cb, callback);
 		//then you need to do
		assert.ok(ipfsSpy.calledWithExactly(ipfsMock.ipfsConfig)); //calledWith is called New fct(args)??
    ipfsMock.IPFS.restore()
  });

	it('new IFPS node should execute callback on "ready" event', function(){
		var callback = function() {}
		var cb = sinon.spy()
 		var ipfsReturn = ipfsFunc.nodeStart(ipfsMock, cb, callback);
 		//ipfsReturn.nodeState.emit('ready');
 		ipfsMock.nodeState.emit('ready') //why is nodestate emitting? //works as well, because its the same "global instance"
		assert.ok(cb.calledOnce); //Determine
	})

	it('...callback should execute commandline "callback()" function', function(){
		//https://stackoverflow.com/questions/27278655/how-do-i-use-sinon-js-to-mock-spy-object-mentioned-inside-the-javascript-functio
		//sinon.stub(ipfs.nodeState,"on")
		var callback = sinon.spy();
		var cb = function(callback){callback();}
 		var ipfsReturn = ipfsFunc.nodeStart(ipfsMock, cb, callback);
 		ipfsReturn.nodeState.emit('ready');
		assert.ok(callback.calledOnce); //Determine
	})
})

describe('NodeStop', function(){

	//constructing our ipfs mock for nodeState.stop (previously overwritten by tests above)
	var ipfsMock = {
	IPFS: {},
	ipfsConfig: {},
	nodeState: new function(){ //new instance
		this.stop = function(cb) {cb();} //to mimick behaviour of ipfs
 		}
	}
	it('should call ipfs.nodeState.stop', function(){
		//https://stackoverflow.com/questions/27278655/how-do-i-use-sinon-js-to-mock-spy-object-mentioned-inside-the-javascript-functio
		//need to mockup nodestate
		var nodeStateSpy = sinon.spy(ipfsMock.nodeState,"stop") //needs to be an instance.
		var callback = function(){}
		var cb = function() {}
 		ipfsFunc.nodeStop(ipfsMock, cb, callback);
		assert.ok(nodeStateSpy.calledOnce); //Determine
	});
	it('should call cb with arguments callback()', function(){
		//https://stackoverflow.com/questions/27278655/how-do-i-use-sinon-js-to-mock-spy-object-mentioned-inside-the-javascript-functio
		//need to mockup nodestate
		var callback = function(){}
		var cb = sinon.spy() //
 		ipfsFunc.nodeStop(ipfsMock, cb, callback);
		assert.ok(cb.calledWith(callback)); //Called with arguments Called
	});
});
