const IPFS = require('ipfs')
const ipfsNode = new IPFS({
  repo: './ipfs', //if default go ipfs folder, then v5 vs. v6 conflict
  EXPERIMENTAL: {
    pubsub: true // need this to work
  }
})

ipfsNode.on('ready', () => {
  console.log('node ready')
  ipfsNode.stop(() => {
    console.log("node is now 'offline'");
  })
})
ipfsNode.on('stop', () => {
  process.exit(); //async processes, but which?
})
