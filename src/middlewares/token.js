const statcode = require('../../config').statcode
const cryption = require('../utils/cryption')
function token_verify(req, res, next) {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '')
    }
    else {
        return next();
    }
    let user = cryption.jwt_verify(token)
    if (user == null)
        return next();
    console.log(user);
    req.token = { name: user.name, id: user.id, access: user.access }
    return next()
}

module.exports = token_verify;