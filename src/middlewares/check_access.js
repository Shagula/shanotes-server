const cryption = require('../utils/cryption')
function check_token(token){
    token = req.headers.authorization.replace('Bearer ', '')
    let user = cryption.jwt_verify(token)
    return user;
}

function check_login(req, res, next) {
    if (!req.token || !check_token(req.token)) {
        return res.json({
            meta: {
                status: 403, //用户未登录
                message: "用户未登录"
            }
        });
    }
    next();
}

function check_admin(req, res, next) {
    if (!req.token) {
        res.json({
            meta: {
                status: 403,
                message: "用户未登录"
            }
        });
        return;
    }
    if (req.token.access >= 2) {
        res.json(
            {
                meta:
                {
                    // 权限不够
                    status: 401,
                    message: "权限不够"
                }
            }
        );
        return;
    }
    next();
}
module.exports = {
    check_login,
    check_admin
}