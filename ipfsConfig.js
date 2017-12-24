var ipfsConfig = {
    repo: './ipfs',
    init: true, // default
    // init: false,
    // init: {
    //   bits: 1024 // size of the RSA key generated
    // },
    start: true,
    // start: false,
    EXPERIMENTAL: { // enable experimental features
      pubsub: true,
      sharding: true, // enable dir sharding
      dht: true // enable KadDHT, currently not interopable with go-ipfs
    },
    config: { // overload the default IPFS node config
      Addresses: {
        Swarm: [
          '/ip4/127.0.0.1/tcp/1338'
        ]
      }
    },
    libp2p: { // add custom modules to the libp2p stack of your node
      modules: {}
    }
    //Put In Bootstrap stuff in here
    // Bootstrap : []

};

module.exports = ipfsConfig;
//module.exports = { ipfsConfig }
