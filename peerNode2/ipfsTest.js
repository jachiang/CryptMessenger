const async = require('async');
//init ifps
const IPFS = require('ipfs');
const ipfsConfig = require('./ipfsConfig.js');

node = new IPFS(ipfsConfig); //ifps without var/const is now accessible globally
//             //on ipfs on event, log it.

// node.on('ready',()=>{
// 	console.log('IPFS initialised');
//     	//console.log(this);
//     setInterval(publish,4000);
//     });


// function publish(){
// 	const topic = 'fruit-of-the-day'
// 	const msg = new Buffer('banana')
// 	node.pubsub.publish(topic, msg, (err) => {
// 		if (err) {
// 			throw err
// 		}
// 	  // msg was broadcasted
// 	  console.log(msg.toString());
// 	})
// }

//async makes sure its all done

//async and series the same if you don't need to pass anything on.
async.waterfall([
  	(cb) => node.on('ready', cb),
  	(cb) => node.version((err, version) => {
    	if (err) { 
    		return cb(err) 
    	}
    	console.log('Version:', version.version)
    	cb()
	}),
	(cb) => {
    	const topic = 'fruit-of-the-day'
		const msg = new Buffer('banana')
		node.pubsub.publish(topic, msg, (err) => {
			if (err) {
				throw err
			}
			console.log(msg.toString());
		});
    }

])

//seems like you need a delay so the published msg can be seen in the channel





