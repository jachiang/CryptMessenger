//const crypto = require('crypto');
const ursa = require('ursa');
const fs = require('fs');
const crypto = require('crypto');
//var key = ursa.generatePrivateKey(1024, 65537); // what is second argument?
//var privkeypem = key.toPrivatePem();
//var pubkeypem = key.toPublicPem();

//console.log(privkeypem.toString('ascii')); // i think it includes breaks
//console.log(pubkeypem.toString('ascii'));

var key = ursa.createPrivateKey(fs.readFileSync('./priv_key.pem'));
var crt = ursa.createPublicKey(fs.readFileSync('./pub_key.pem'));
//console.log(key.toPublicPem().toString('ascii'));


//toforward /symmetric AES key/URI/signature/senderPubKey
//signature = hashsum of data(encrypted with your private key)

//AES algorithm via CRYPTO
//http://lollyrock.com/articles/nodejs-encryption/
//how to separate ...
//random number generator for node js crypto
//https://blog.tompawlak.org/generate-random-values-nodejs-javascript

//Good example implementation
//https://github.com/phpmycoder/cryptico-nodes

//Function - AES encrypt file and push to IPFS

var data = fs.readFileSync('./data.txt'); // buffer
const IV_length = 16;
const password = crypto.randomBytes(IV_length).toString('hex');
const algorithm = 'aes-256-ctr';
function encrypt(data,password,algorithm) {
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = Buffer.concat([cipher.update(data),cipher.final()]);
  //console.log(crypted);
  //console.log(password);
  //Return AES Key(HEX), cryped(BUFFER)
}
encrypt(data,password,algorithm)

//Checksum: https://www.hacksparrow.com/how-to-generate-md5-sha1-sha512-sha256-checksum-hashes-in-node-js.html
//We do the same but syncronously
var algo = 'sha256';
var shasum = crypto.createHash(algo);
shasum.update(data);
var d = shasum.digest('hex');
console.log(d);

//sign checksum with key
