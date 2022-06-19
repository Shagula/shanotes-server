const express = require('express')
const notes = require('../modules/notes');
const { check_login, check_admin } = require('../middlewares/check_access');
let router = express.Router();
const statcode = require('../../config').statcode;
router.post('/create_folder', check_login, async (req, res) => {
    if (!req.body)
        return res.json({ meta: { status: statcode.err, message: '非法参数' } });

    let author = req.token.id;
    let parent = parseInt(req.body.parent);
    let title = req.body.title;
    let result = await notes.create_folder(parent, author, title);
    if (result)
        return res.json({ meta: { status: statcode.ok, message: 'okay' } });
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
        return res.json({ meta: { status: statcode.ok, message: 'okay' } });
    else
        return res.json({ meta: { status: statcode.err, message: '创建失败' } });
})

router.get('/read_link', check_login, async (req, res) => {
    let user_id = req.token.id;
    let path_id = req.query.path_id;

    let content = await notes.read_link(path_id);
    if (content.author != user_id)
        return res.json({ meta: { status: statcode.err, message: '无权访问' } });
    else
        return res.json({ content, meta: { status: statcode.ok, message: 'okay' } });
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
module.exports = router;