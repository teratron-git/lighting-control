// Top secret config file :)
// It visible for demo purposes only.

module.exports = {
  port: 3001,
  db: {
    host: 'vh224.spaceweb.ru',
    user: 'terraband_light',
    database: 'terraband_light',
    password: '123qweQWE',
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
