const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const conf = require('../../config').cryption
function md5_hash(passwd){
    return crypto.createHash('md5').update(passwd).digest('hex');
}

function jwt_sign(name, id, access){
    let token = jwt.sign({
        name: name,
        id: id, 
        access: access
    }, conf.private_key,{
        expiresIn: conf.exp,
        algorithm: 'HS256'
    })
    return token
}

function jwt_verify(jwt){
    return jwt.verify(jwt, conf.private_key)
}

module.exports = {
    md5_hash,
    jwt_sign,
    jwt_verify
}