// Top secret config file :)
// It visible for demo purposes only.

module.exports = {
  port: 3001,
  db: {
    host: 'remotemysql.com',
    user: '8VYRAWnfYD',
    database: '8VYRAWnfYD',
    password: 'BcZJLnWS95',
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
