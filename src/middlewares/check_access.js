function check_login(req, res, next) {
    if (!req.token) {
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