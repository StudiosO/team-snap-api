var passwordHash = require('password-hash');

function createHash(password){
    return passwordHash.generate(password, {
        algorithm: "MD5",
        saltLength: 9
    })
}

function validateHash(password, hashed){
    return passwordHash.verify(password, hashed)
}

module.exports = {
  'hash': createHash,
  'validate': validateHash
};