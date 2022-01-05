// Top secret config file :)
// It visible for demo purposes only.

module.exports = {
  port: 3001,
  db: {
    host: 'sql4.freesqldatabase.com',
    user: 'sql4464926',
    database: 'sql4464926',
    password: 'DQdj6dpJIJ',
  },
  jwt: {
    secret: 'test',
    tokens: {
      access: {
        type: 'access',
        expiresIn: '60m',
      },
      refresh: {
        type: 'refresh',
        expiresIn: '10080m',
      },
    },
  },
};
