// get crypto module
const crypto = require("crypto");
const Benchmark = require('benchmark');

function randomString(size = 21) {  
  return crypto
    .randomBytes(size)
    .toString('base64')
    .slice(0, size)
}

const data = randomString(1024)

var suite = new Benchmark.Suite;

// add tests
suite
.add('MD5#cryptoNoHash', function() {
// const str = "I need to be hashed using MD5😃!";
const secret = "This is a secret 🤫";
const md5Hasher = crypto.createHmac("md5", "");
const hash = md5Hasher.update(data).digest("hex");
//console.log(hash); // 1c211d131453e023d101c40f2c3372e0
})
.add('MD5#crypto', function() {
// const str = "I need to be hashed using MD5😃!";
const secret = "This is a secret 🤫";
const md5Hasher = crypto.createHmac("md5", secret);
const hash = md5Hasher.update(data).digest("hex");
//console.log(hash); // 1c211d131453e023d101c40f2c3372e0
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });