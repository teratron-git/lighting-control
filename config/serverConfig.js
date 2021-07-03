// Top secret config file :)
// It visible for demo purposes only.
module.exports = {
  port: 9999,
  dbUrlProd: '',
  dbUrlDev: '',
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
