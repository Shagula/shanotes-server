const sql = require('../drivers/sql');
const cryption = require('../utils/cryption')
const statcode = require('../../config').statcode
async function add_user(name, passwd) {
    if ((await sql.check('user', 'name', name)).verdict) {
        return { stat: 400, err: 'user already exists' }
    }
    let ret = await sql.qry('insert into user(name, password, access) values(?,?, 2)', [name, cryption.md5_hash(passwd)])
    if (ret.verdict) {
        return { stat: statcode.ok }
    }
    else {
        return { stat: statcode.err, err: ret.err }
    }
}

async function login(name, passwd) {
    let ret = await sql.qry('select password, id, access from user where name = ? limit 1', [name]);
    if (ret.verdict && ret.data.length == 1) {
        if (ret.data[0].password === cryption.md5_hash(passwd)) {
            return {
                stat: statcode.ok,
                jwt: cryption.jwt_sign(name, ret.data[0].id, ret.data[0].access),
                access: ret.data[0].access,
                id: ret.data[0].id,
                name: name
            }
        }
        else {
            return { stat: statcode.err, err: ret.err ? ret.err : '密码错误' }
        }
    }
    else {
        return { stat: statcode.err, err: '用户未找到可能用户名输入错误' }
    }
}

async function change_password(user_id, new_password) {
    if (!(await sql.check('user', 'id', user_id)).verdict) {
        return { stat: 400, msg: 'user doesn\'t exist' }
    }
    new_password = cryption.md5_hash(new_password)
    let sql_ins = 'update user set password=? where id=?';
    let sql_res = await sql.qry(sql_ins, [new_password, user_id]);
    if (sql_res.verdict)
        return { stat: 200, msg: 'ok' };
    else
        return { stat: 400, msg: 'update failed!' };
}


async function test() {
    console.log(await add_user('muffin1', 'hey'))
    console.log(await login('muffin2', 'hey'))
}

// test().then()
module.exports = {
    add_user,
    login,
    change_password
}