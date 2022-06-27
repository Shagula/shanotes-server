const e = require('cors');
const sql = require('../drivers/sql');

const folder_tag = 1, markdown_tag = 2;

async function update_parent(parent, child_id, del = false) {
    let par = await read_link(parent);
    if (par == null || par.link_type != folder_tag)
        return false;
    let arr = JSON.parse(par.content);
    if (del)
        arr = arr.filter(id => id != child_id);
    else {
        arr.push(child_id);
    }
    return await update_link(parent, JSON.stringify(arr));
}

async function create_folder(parent, user_id, name) {
    let content = '[]';
    let sql_ins = 'insert into link(link_type,parent,author,title,content) values(1,?,?,?,?)';
    let sql_res = await sql.qry(sql_ins, [parent, user_id, name, content]);
    if (!sql_res.verdict)
        return 0;
    if (parent) {
        if (! await update_parent(parent, sql_res.data.insertId))
            return 0;
    }
    return sql_res.data.insertId;
}

async function create_note(parent, user_id, title) {
    let sql_ins = 'insert into link(link_type,parent,author,title) values(2,?,?,?)';
    let sql_res = await sql.qry(sql_ins, [parent, user_id, title]);
    if (!sql_res.verdict)
        return 0;
    if (parent) {
        if (! await update_parent(parent, sql_res.data.insertId))
            return 0;
    }
    return sql_res.data.insertId;
}

async function update_link(id, content) {
    let sql_ins = 'update link set content=?,update_time=? where id=?';
    let sql_res = await sql.qry(sql_ins, [content, new Date(), id]);
    return sql_res.verdict;
}

async function get_children(id) {
    let sql_ins =
        `select id,link_type,title,create_time,update_time 
        from link 
        where parent=?`;
    let sql_res = await sql.qry(sql_ins, [id]);
    if (!sql_res.verdict || sql_res.data.length == 0)
        return null;
    return sql_res.data;
}

// 删除文件，删除文件夹，并更新父亲信息
async function del_link(id) {
    let meta = await read_meta(id);
    if (!meta)
        return false;
    let parent = meta.parent;
    if (parent)
        update_parent(parent, id, true);
    return await del_link_iter(id);
}

// 下一个函数的辅助递归函数
async function del_par(id) {
    let lst = await get_children(id);
    let flag = true;
    if (lst) {
        for (let item of lst)
            flag &= await del_link_iter(item.id);
    }
    return flag;
}

// 删除link 的递归函数(删除link 会删除子节点)
async function del_link_iter(id) {
    let sql_ins = 'delete from link where id=?';
    let sql_res = await sql.qry(sql_ins, [id]);
    if (sql_res.verdict)
        return await del_par(id);
    return sql_res.verdict;
}

// 读取一个文件/文件夹的 meta 信息
async function read_meta(id) {
    let sql_ins = 'select id,parent,link_type,title,author,create_time,update_time from link where id=?';
    let sql_res = await sql.qry(sql_ins, [id]);
    return sql_res.data ? sql_res.data[0] : null;
}
// 读取一个文件 / 文件夹
async function read_link(id) {
    let sql_ins = 'select * from link where id=?';
    let sql_res = await sql.qry(sql_ins, [id]);
    if (!sql_res.verdict || sql_res.data.length == 0)
        return null;
    return sql_res.data[0];
}

// 检查是否是我的目录，用于权限认证
async function my_link(id, user_id) {
    let meta = await read_meta(id);
    return meta && meta.author == user_id;
}

// 获取根目录信息
async function root_path(user_id) {
    let sql_ins =
        `select id,link_type,title,create_time,update_time 
    from link 
    where parent=0 && author=?`;
    let sql_res = await sql.qry(sql_ins, [user_id]);
    if (!sql_res.verdict || sql_res.data.length == 0)
        return null;
    return sql_res.data;
}

/*
    移动一个文件or 文件夹
    1. 从父文件夹中删除
    2. 添加到新文件夹下
*/
async function move_path(id, new_par) {
    let meta = await read_meta(id);
    if (meta == null)
        return false;
    if (meta.parent != 0 && !(await update_parent(meta.parent, id, true)))
        return false;
    let sql_ins = 'update link set parent = ? where id=?';
    let sql_res = await sql.qry(sql_ins, [new_par, id]);

    if (!sql_res.verdict)
        return false;
    return true;
}

// 充命名
async function rename(id, new_name) {
    if (new_name.length <= 1)
        return false;
    
    let sql_ins = 'update link set title = ? where id=?';
    let sql_res = await sql.qry(sql_ins,[new_name,id]);

    return sql_res.verdict;
}
async function test() {
    console.log(await del_link(2));
}
// test().then();
module.exports = {
    read_meta,
    create_folder,
    create_note,

    update_link,
    read_link,
    del_link,
    get_children,
    my_link,

    root_path,
    move_path,
    rename,
}