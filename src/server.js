let serv = 'https://lighting-control-app.herokuapp.com';
if (process.env.NODE_ENV === 'development') {
  serv = 'http://localhost:3001';
}

module.exports = {
  serv: serv,
};
