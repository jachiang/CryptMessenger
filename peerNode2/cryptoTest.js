var crypto = require('crypto');
const fs = require('fs');
const writestream = fs.createWriteStream(__dirname + '/pubkey.txt');

//see node.js crypto documentation
var group = 'modp5';
var jamesDH = crypto.getDiffieHellman(group);
var bobDH= crypto.getDiffieHellman(group);
jamesDH.generateKeys();
bobDH.generateKeys();

console.log(jamesDH.getPublicKey('base64'));
console.log(jamesDH.getPublicKey().toString('base64'))
//console.log(bobDH.getPublicKey());
//writestream.write(jamesDH.getPublicKey()) ;

const buf = Buffer.from('hello world', 'ascii')
console.log(buf)


