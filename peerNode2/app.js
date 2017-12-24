var vorpal = require('vorpal');
//ipfs functions & dependencies
var ipfsFunc = require('./ipfsFunctions')
var ipfs = {
    IPFS: require('ipfs'),
    ipfsConfig: require('./ipfsConfig.js'),
    nodeState: {}
}
//y-js functions & dependencies
var yFunc = require('./yFunctions')
const Y = require('yjs')
require('y-ipfs-connector')(Y)
// other Yjs deps:
require('y-leveldb')(Y)
require('y-memory')(Y)
require('y-array')(Y)
require('y-text')(Y)
var y = {
  lib: Y,
  state: {}
}

//cmdr actions defined
const cmdr = new vorpal();
cmdr
  .command('ipfs start', 'starts IPFS server')
    .action(function(args, callback) {
        //cb to be executed upon success
      var cb = (cb) => {
          cmdr.log('IPFS initialised');
          cb();
      }
      ipfsFunc.nodeStart(ipfs,cb,callback); //cb is callback to execute, callback is vorpal callback

    })

cmdr
  .command('ipfs stop', 'stops IPFS server')
    .action(function(args, callback) {
         //cb to be executed upon success
      var cb = (cb) => {
          cmdr.log('IPFS stopped');
          callback(); //this required, returns to cmdline
      }
      ipfsFunc.nodeStop(ipfs,cb,callback); //cb is callback to execute, callback is vorpal callback
    })

cmdr
  .command('y start', 'loads y object')
    .action(function(args, callback) {
        //loads y object, passes callback
        yFunc.yStart(y,ipfs,callback);
    })

cmdr
  .command('y push [input...]', 'adds to y array')
    .action(function(args, callback) {
        //y add object
        yFunc.yPush(y,args,callback);
    })

cmdr
  .command('y get <num>', 'reads from y array') //num refers to number of entries to read
    .action(function(args, callback) {
        //loads y object
        yFunc.yGet(y,args,callback);

    })

//this actually runs the command line program
cmdr
    .delimiter('ipfsMsg>')
    .show();
