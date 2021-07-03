var express = require('express');
var cors = require('cors');
var app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const path = require('path');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'build')));

const connection = mysql.createPool({
  connectionLimit: 5,
  host: 'remotemysql.com',
  user: '8VYRAWnfYD',
  database: '8VYRAWnfYD',
  password: 'BcZJLnWS95',
});

// app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/api/allLights', async function (req, res, next) {
  connection.execute('SELECT * FROM lights ORDER BY id DESC', function (err, results) {
    console.log(err);
    console.log(results);

    res.json(results);
  });
});

app.post('/api/login', urlencodedParser, async function (req, res, next) {
  const { userName, password } = req.body;
  console.log('🚀 ~ file: app.js ~ line 48 ~ password', password);
  console.log('🚀 ~ file: app.js ~ line 48 ~ userName', userName);
  try {
    connection.execute(
      'SELECT password FROM users WHERE userName = ?',
      [userName],
      function (err, results) {
        if (err) return console.log(err);

        let bdPass = results[0]?.password;
        console.log('🚀 ~ file: app.js ~ line 54 ~ results', results);
        if (bdPass === password) {
          console.log('Пароль верный', bdPass, password);
          connection.execute(
            'SELECT id, userName, role FROM users WHERE userName= ? ORDER BY id DESC',
            [userName],
            function (err, results) {
              if (err) return console.log(err);
              console.log(results);
              res.json({ ...results[0], success: true });
            }
          );
        } else {
          console.log('Пароль неверный', bdPass, password);
          res.json({ success: false, error: 'Неверные учетные данные!' });
        }
      }
    );
  } catch (err) {
    res.status(401).json({ message: err.message });
    next();
  }
});

app.post('/api/data', urlencodedParser, async function (req, res, next) {
  const { type, location, isOn, managerId, role } = req.body;
  console.log('🚀 ~ file: app.js ~ line 84 ~ role', role);
  console.log('🚀 ~ file: app.js ~ line 84 ~ managerId', managerId);
  console.log('🚀 ~ file: app.js ~ line 84 ~ isOn', isOn);
  console.log('🚀 ~ file: app.js ~ line 84 ~ location', location);
  console.log('🚀 ~ file: app.js ~ line 84 ~ type', type);
  if (role === 'admin') {
    await connection.execute(
      'INSERT INTO lights (`type`, `location`, `isOn`, `managerId`) VALUES (?,?,?,?)',
      [type, location, isOn, managerId],
      async function (err, results) {
        if (err) return console.log(err);
        console.log(err);
        console.log(results);
        if (results) {
          await connection.execute(
            'SELECT * FROM lights ORDER BY id DESC',
            function (err, results) {
              if (err) return console.log(err);
              console.log(err);
              console.log(results);
              if (results) {
                res.json(results);
              }
            }
          );
          // res.json(results);
        }
      }
    );
  }
});

app.listen(9999, function () {
  console.log('CORS-enabled web server listening on port 9999');
});

app.use((req, res, next) => {
  const err = new Error('Такая страница не найдена!');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', { message: err.message });
});

// connection.end(function (err) {
//   if (err) {
//     return console.log('Ошибка: ' + err.message);
//   }
//   console.log('Подключение закрыто');
// });
