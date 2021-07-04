// Top secret config file :)
// It visible for demo purposes only.

let serv;
if (process.env.NODE_ENV === 'production') {
  serv = 'https://lighting-control-app.herokuapp.com';
}
if (process.env.NODE_ENV === 'development') {
  serv = 'http://localhost';
}

module.exports = {
  port: 9999,
  serv: serv,
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
