function json_ret(res, ok, message) {
    if (ok)
        return res.json({ meta: { status: 200, message } });
    return res.json({ meta: { status: 400, message } });
}

module.exports = {
    json_ret,
}