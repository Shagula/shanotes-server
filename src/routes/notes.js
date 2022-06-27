const express = require('express')
const check_link_access = require('../middlewares/note_access');
const notes = require('../models/notes');
const { check_login, check_admin } = require('../middlewares/check_access');
const statcode = require('../../config').statcode;
const { json_ret } = require('../utils/util');

let router = express.Router();

router.get('/root', check_login, async (req, res) => {
    let user_id = req.token.id;
    let root_value = await notes.root_path(user_id);
    if (root_value == null)
        return res.json({ meta: { status: statcode.err, message: '这里空空如也' } });
    return res.json({ meta: { status: statcode.ok, message: 'okay' }, value: root_value });
})

router.post('/create_folder', check_login, async (req, res) => {
    if (!req.body)
        return res.json({ meta: { status: statcode.err, message: '非法参数' } });

    let author = req.token.id;
    let parent = parseInt(req.body.parent);
    let title = req.body.title;
    let result = await notes.create_folder(parent, author, title);
    if (result)
        return res.json({ id: result, meta: { status: statcode.ok, message: 'okay' } });
    else
        return res.json({ meta: { status: statcode.err, message: '创建失败' } });
})

router.post('/create_note', check_login, async (req, res) => {
    if (!req.body)
        return res.json({ meta: { status: statcode.err, message: '非法参数' } });

    let author = req.token.id;

    let parent = req.body.parent;
    let title = req.body.title;

    let result = await notes.create_note(parent, author, title);
    if (result)
        return res.json({ id: result, meta: { status: statcode.ok, message: 'okay' } });
    else
        return res.json({ meta: { status: statcode.err, message: '创建失败' } });
})

router.get('/read_link', check_login, async (req, res) => {
    let user_id = req.token.id;
    let path_id = req.query.path_id;

    let content = await notes.read_link(path_id);
    if (content == null || content.author != user_id)
        return res.json({ meta: { status: statcode.err, message: '无权访问' } });
    else
        return res.json({ content, meta: { status: statcode.ok, message: 'okay' } });
})
router.get('/read_child', check_login, async (req, res) => {
    let user_id = req.token.id;
    let path_id = req.query.path_id;

    if (!(await notes.my_link(path_id, user_id)))
        return res.json({ meta: { status: statcode.err, message: '无权访问' } });
    let resu = await notes.get_children(path_id);
    if (res != null)
        return res.json({ value: resu, meta: { status: statcode.ok, message: 'okay' } });
    else
        return res.json({ meta: { status: statcode.err, message: '访问失败' } });

})
router.post('/update_link', check_login, async (req, res) => {
    let user_id = req.token.id, path_id = req.body.path_id, content = req.body.content;
    if (!(await notes.my_link(path_id, user_id)))
        return res.json({ meta: { status: statcode.err, message: '无权访问' } });
    let resu = await notes.update_link(path_id, content);
    if (!resu)
        return res.json({ meta: { status: statcode.err, message: '更新失败' } });
    else
        return res.json({ meta: { status: statcode.ok, message: '更新成功' } });
})

router.post('/del_link', check_login, async (req, res) => {
    let user_id = req.token.id, path_id = req.body.path_id;
    if (!(await notes.my_link(path_id, user_id)))
        return res.json({ meta: { status: statcode.err, message: '无权访问' } });

    let resu = await notes.del_link(path_id);
    if (!resu)
        return res.json({ meta: { status: statcode.err, message: '删除失败' } });
    else
        return res.json({ meta: { status: statcode.ok, message: '删除成功' } });

})
router.get('/read_meta', check_login, async (req, res) => {
    let info = req.query, user_id = req.token.id;
    let path_id = info.path_id, parent = info.parent;

    if (!(await notes.my_link(path_id, user_id)))
        return res.json({ meta: { status: statcode.err, message: '无权访问' } });
    let resu = await notes.read_meta(path_id);
    if (!resu)
        return res.json({ meta: { status: statcode.err, message: '读取失败' } });
    else
        return res.json({ id: path_id, parent: resu.parent, meta: { status: statcode.ok, message: '读取成功' } });
})

router.post('/move_link', check_login, async (req, res) => {
    let info = req.body, user_id = req.token.id;
    let path_id = info.path_id, parent = info.parent;

    if (!(await notes.my_link(path_id, user_id)))
        return res.json({ meta: { status: statcode.err, message: '无权访问' } });

    let resu = await notes.move_path(path_id, parent);
    if (!resu) {
        // console.log(resu);
        return res.json({ meta: { status: statcode.err, message: '移动失败' } });
    }
    else {
        return res.json({ meta: { status: statcode.ok, message: '移动成功' } });
    }
})

router.post('/rename', check_login, check_link_access, async (req, res) => {
    let path_id = req.body.path_id;
    let name = req.body.name;
    if (!await notes.rename(path_id, name))
        return json_ret(res,false,"重命名失败")
    return json_ret(res,true,"okay");
})

module.exports = router;