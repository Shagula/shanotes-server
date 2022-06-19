module.exports = {
  basic: {
    port: 80
  },
  sql: {
    host: 'localhost',
    user: 'shanotes',
    password: 'shanotes',
    database: 'shanotes'
  },
  cryption: {
    private_key: 'shagula',
    exp: 60 * 60 * 24
  },
  statcode: {
    ok: 200,
    err: 400,
    invalidated_token: 403
  }
}