// you need to create and inject a IPFS object
const IPFS = require('ipfs')

const Y = require('yjs')
require('y-ipfs-connector')(Y)
// other Yjs deps:
require('y-leveldb')(Y)
require('y-memory')(Y)
require('y-array')(Y)
require('y-text')(Y)

// create IPFS node
const ipfsNode = new IPFS({
  repo: './ipfs', //if default go ipfs folder, then v5 vs. v6 conflict
  EXPERIMENTAL: {
    pubsub: true // need this to work
  }
})

//try calling Y after IPFS on ready afterwards
Y({
  db: {
    //use local db https://github.com/y-js/y-leveldb
      name: 'leveldb',
      namespace: 'JC-dev',
      dir: './y-db',
      cleanStart: false // (if true, overwrite existing content - great for debugging)
  },
  connector: {
    name: 'ipfs', // use the IPFS connector
    ipfs: ipfsNode, // inject the IPFS object
    room: 'JC-dev'
  },
  sourceDir: '/node_modules', // location of the y-* modules
  share: {
    myArray: 'Array' // y.share.textarea is of type Y.Text
  }
})
.then(function(y) { //ok so they use promises ...

  // bind the textarea to a shared text element
  //console.log('test');
  //console.log(y)
//y.share.myArray.push(["test", "test2"])
//y.share.myArray.push(["test3", "test4"])
  console.log(y.share.myArray.toArray())
  //console.log(y)
  console.log(y.share.myArray.get(3))
  return y;
})
.then(function(y){
  console.log('last then reached')
  y.close()
  .then(()=>{
    console.log('closed')
    ipfsNode.stop(); //causes... Error: This command must be run in online mode. Try running 'ipfs daemon' first.
  })
})



//ipfsNode.stop(function(){console.log('stop called')})
//does it keep running because of IPFS?
//y still running?



//setup in your code.
//update on one side
//observe the other with listener?

//local archive of messages? perhaps hashmap or other...
//to listen for new messages >
//basically reparse the array for new updates
