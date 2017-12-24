//to be exported to test
module.exports = {
	nodeStart : function(ipfs,cb,callback) {
		    ipfs.nodeState = new ipfs.IPFS(ipfs.ipfsConfig); //see app.js for ipfs object definition
            ipfs.nodeState.on('ready',()=>{
	            cb(callback);
            })
            return ipfs;
            //hard to test, because have to emit AFTER this listener declared.
            //So return ipfs, so you can call nodeState to emit again
	},
	nodeStop : function(ipfs,cb,callback) {
           	ipfs.nodeState.stop(() => {
            	//https://stackoverflow.com/questions/34361379/arrow-function-vs-function-declaration-expressions-are-they-equivalent-exch
                cb(callback);
            })
	},
}
