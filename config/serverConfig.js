// Top secret config file :)
// It visible for demo purposes only.

module.exports = {
  port: 3001,
  db: {
    host: 'sql11.freesqldatabase.com',
    user: 'sql11482333',
    database: 'sql11482333',
    password: 'AiIzGKBha1',
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
