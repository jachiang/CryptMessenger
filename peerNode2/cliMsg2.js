//init vorpal
const vorpal = require('vorpal');
const cmdr = new vorpal();
//init ifps
const IPFS = require('ipfs');
const ipfsConfig = require('./ipfsConfig.js');

//so can be instantiated, accessed, modified by different closures
var node;

cmdr
    .command('ipfs start', 'starts IPFS server')
        .action(function(args, callback) {
            //below must exist already, so it can accessed globally
            node = new IPFS(ipfsConfig); //ifps without var/const is now accessible globally
            //on ipfs on event, log it.
            node.on('ready',()=>{
                this.log('IPFS initialised');
                //console.log(this);
                callback();
            })
        });

cmdr
    .command('ipfs stop', 'stops IPFS server')
        .action (function(args,callback) { //weird depending on function or ()=> cmdr will or wont be within scope of .this below
            node.stop(() => {
            	//https://stackoverflow.com/questions/34361379/arrow-function-vs-function-declaration-expressions-are-they-equivalent-exch 
                this.log('IPFS stopped'); //i guess this is scoped differently here
                //console.log(this);
                callback();
            })
        })

cmdr
    .command('ipfs pub','publish msg to topic' )
    .action(function(args,callback) {
        const topic = 'fruit-of-the-day'
        const msg = new Buffer('banana')
        node.pubsub.publish(topic, msg, (err) => {
            if (err) {
                throw err
            }
            console.log('Published: ' + msg + ' under the topic ' + topic);
            callback();
        })
    })

cmdr
    .command('ipfs swarm peers', 'check swarm peers')
    .action(function(args,callback){
        var topic = 'fruit-of-the-day'
        node.pubsub.peers(topic, (err, peerIds) => {
            if (err) {
                throw err
            }
            console.log(peerIds)
        })
    })

cmdr
    .delimiter('ipfsMsg>')
    .show();
