const sql = require('../drivers/sql');

const folder_tag = 1, markdown_tag = 2;

async function update_parent(parent, child_id, del = false) {
    let par = await read_link(parent);
    if (par == null || par.link_type != folder_tag)
        return false;
    let arr = JSON.parse(par.content);
    if (del)
        arr = arr.filter(id => id != child_id);
    else
        arr.push(child_id);
    return await update_link(parent, JSON.stringify(arr));
}

async function create_folder(parent, user_id, name) {
    let content = '[]';
    let sql_ins = 'insert into link(link_type,parent,author,title,content) values(1,?,?,?,?)';
    let sql_res = await sql.qry(sql_ins, [parent, user_id, name, content]);
    if (!sql_res.verdict)
        return false;
    if (parent)
        return await update_parent(parent, sql_res.data.insertId);
    return true;
}

async function create_note(parent, user_id, title) {
    let sql_ins = 'insert into link(link_type,parent,author,title) values(2,?,?,?)';
    let sql_res = await sql.qry(sql_ins, [parent, user_id, title]);
    if (!sql_res.verdict)
        return false;
    if (parent)
        return await update_parent(parent, sql_res.data.insertId);
    return true;
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

async function del_link(id) {
    let meta = await read_meta(id);
    if (!meta)
        return false;
    let parent = meta.parent;
    if (parent)
        update_parent(parent, id, true);
    return await del_link_iter(id);
}

async function del_par(id) {
    let lst = await get_children(id);
    let flag = true;
    if (lst) {
        for (let item of lst)
            flag &= await del_link_iter(item.id);
    }
    return flag;
}

async function del_link_iter(id) {
    let sql_ins = 'delete from link where id=?';
    let sql_res = await sql.qry(sql_ins, [id]);
    if (sql_res.verdict)
        return await del_par(id);
    return sql_res.verdict;
}
async function read_meta(id) {
    let sql_ins = 'select id,parent,link_type,title,author,create_time,update_time from link where id=?';
    let sql_res = await sql.qry(sql_ins, [id]);
    return sql_res.data ? sql_res.data[0] : null;
}

async function read_link(id) {
    let sql_ins = 'select * from link where id=?';
    let sql_res = await sql.qry(sql_ins, [id]);
    if (!sql_res.verdict || sql_res.data.length == 0)
        return null;
    return sql_res.data[0];
}

async function my_link(id, user_id) {
    let meta = await read_meta(id);
    return meta && meta.author == user_id;
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
    my_link
}