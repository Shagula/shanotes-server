const statcode = require('../../config').statcode
const cryption = require('../utils/cryption')
function token_verify(req, res, next) {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '')
    }
    else {
        res.json({
            meta: {
                status: statcode.invalidated_token,
                message: 'invalidated token'
            }
        })
        return
    }
    let user = cryption.jwt_verify(token)
    if (!user)
        return res.json({ meta: { status: statcode.invalidated_token, message: 'invalid token' } });
    req.token = { name: user.name, id: user.id, access: user.access }
    next()
}

module.exports = token_verify;