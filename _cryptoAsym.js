const ursa = require('ursa');
const fs = require('fs');
const crypto = require('crypto')

//Generate a KeyPair
  //(modulus (min1024), exponent (must be odd)), message must be smaller than modulus
// var keyPair = ursa.generatePrivateKey(2048,65537);
// //key is in utf8 characters. if encode in base64, then utf(8bit seq) > buffer(seq) > base64(6bit seq)
// pubPem = keyPair.toPublicPem('base64');
// privPem = keyPair.toPrivatePem('base64');
//base64 treats binary sequence numerically.

// console.log(privPem)
// var b = new Buffer(privPem, 'base64')
// var s = b.toString('utf8'); //asumes utf8 by default
// console.log(s) //back to original key content string
// var b = new Buffer(s,'utf8')
// var s = b.toString('base64');
// console.log(s)

//data can be string or buffer
  //base64 saves as bin sequence, in 6bit chunks, hex in 4 bit chunks
//fs.writeFileSync('./PubPem.pem', pubPem, {encoding: 'base64'})
//fs.writeFileSync('./PrivPem.pem', privPem, {encoding: 'base64'})

//Reload the Keypair
privKey = ursa.createPrivateKey(fs.readFileSync('./PrivPem.pem',{encoding: 'utf8'})); //because buffer was derived from utf8
pubKey = ursa.createPublicKey(privKey.toPublicPem('base64'),'base64'); //takes in base64 / utf8 / buffer

//Encrypt the message with pub_key
  //maximum msg length? message must be smaller than modulus
  //AESkey as message
const IV_length = 16;
var password = crypto.randomBytes(IV_length).toString('hex');
password = '3d788c9ebcc372bf2e48e707a30aeff8'
//hex for password, base 64 out for transmision
var asymCipher = pubKey.encrypt(password, 'hex', 'base64'); //padding in there, because always different cipher

//Decrypt Cipher with createPrivateKey
  //try a fail case, responds with decoding error
var decipher = privKey.decrypt(asymCipher, 'base64', 'hex'); //base64 in, hex out
//console.log(decipher)

//Create the public address by hashing pub_key
var algo = 'sha256';
var shasum = crypto.createHash(algo);
shasum.update(pubKey.toPublicPem('utf8')); //
var pubAddr = shasum.digest('hex');
//console.log(pubAddr);


//better implemented as a stream...
//symmetric encryption examples from here: http://lollyrock.com/articles/nodejs-encryption/
var data = "test message longer longer"
//symCipher
  //why cipher.final?
function encrypt(text){
  //console.log(password)
  const algorithm = 'aes-256-ctr';
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex') //utf8 input, hex cipher //update can be called many times (Stream)
  //apparently you can call multiple times, like streaming?
  crypted += cipher.final('hex') //not sure what this does
  //console.log(crypted)
  return crypted
}

function decrypt(text){
  const algorithm = 'aes-256-ctr';
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  //console.log(dec)
  return dec;
}

decrypt(encrypt(data))
//console.log(decrypt(encrypt(data)))

//create signature
var buf = new Buffer(data,'utf8');
var algorithm = 'md5'
var signature = privKey.hashAndSign(algorithm, data,'utf8','hex') //utf8, hex
//var encryptedMessage = pubB.encrypt(buffer, encoding) //why buffer in here as well? Doesn't have to be.
//https://gist.github.com/GuillermoPena/f67fd48741869a3f3f96
//Documentation: hashAndSign(algorithm, buf, bufEncoding, outEncoding, use_pss_padding, salt_len)
console.log(signature)

//verfiy signature
var buffer2 = new Buffer(data, 'utf8')
var isValid = pubKey.hashAndVerify(algorithm, buffer2, signature, 'hex') //hex is signature encoding
console.log(isValid)

//need to sign: AES Key & Message (sign together or separate?)




//array message: Addr|AsymCipher|SymCipher, SymCipher has Signature of hash(data), and Signature of hash(AESkey)
//signature is hash(Message), encrypted with private key
