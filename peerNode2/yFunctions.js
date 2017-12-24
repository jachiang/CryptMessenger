//Y is from const Y = require('yjs') in the app.js file
module.exports = {
	yStart : function(y,ipfs,callback) {
		y.lib({
			  db: {
			    //use local db https://github.com/y-js/y-leveldb
			      name: 'leveldb',
			      namespace: 'JC-dev',
			      dir: './y-db',
			      cleanStart: false // (if true, overwrite existing content - great for debugging)
			  },
			  connector: {
			    name: 'ipfs', // use the IPFS connector
			    ipfs: ipfs.nodeState, // inject the IPFS object
			    room: 'JC-dev' //I don't think this equal pubsub room name literally.
			  },
			  sourceDir: '/node_modules', // location of the y-* modules
			  share: {
			    myArray: 'Array' // y.share.textarea is of type Y.Text
			  }
			})
			.then(function(yObject) {
				y.state = yObject;
				console.log('y object initiated ...')
				//console.log(y.state)
				callback();
			})
		},

	yPush : function(y,args,callback) {
			y.state.share.myArray.push(args.input); //args.input to access input array
			console.log('pushed to y array: ',args.input)
			callback();
		},

	yGet : function(y,args,callback) {
			//arguments are how many entries back it should read
			//for loop from length to length - num
			var yArray = y.state.share.myArray.toArray()
			var yLen = yArray.length;
			var yReturn = yArray.slice(yLen - args.num)
			console.log(yArray)
			callback();
		}
};
