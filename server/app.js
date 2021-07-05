let express = require('express');
let cors = require('cors');
let app = express();
let mysql = require('mysql2');
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let bcrypt = require('bcrypt');
let config = require('../config/serverConfig');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

const connection = mysql.createPool({
  connectionLimit: 5,
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

app.listen(config.port, function () {
  console.log(`Сервер  запущен!`);
});

app.get('/api/allLights', async function (req, res, next) {
  try {
    await connection.execute('SELECT * FROM lights ORDER BY id DESC', function (err, results) {
      if (err) return new Error(`Ошибка при работе с БД!`);
      res.json(results);
    });
  } catch (err) {
    res.json({ message: err.message });
    next(err);
  }
});

app.post('/api/login', urlencodedParser, async function (req, res, next) {
  try {
    if (!req.body) return new Error(`Необходимые данные на сервер не переданы!`);
    const { userName, password } = req.body;

    await connection.execute(
      'SELECT password FROM users WHERE userName = ?',
      [userName],
      function (err, results) {
        if (err) return new Error(`Ошибка при работе с БД!`);
        let bdPass = results[0]?.password || '';
        const isValidPass = bcrypt.compareSync(password, bdPass);

        if (isValidPass) {
          connection.execute(
            'SELECT id, userName, role FROM users WHERE userName= ? ORDER BY id DESC',
            [userName],
            function (err, results) {
              if (err) return new Error(`Ошибка при работе с БД!`);
              res.json({ ...results[0], success: true });
            }
          );
        } else {
          res.json({ success: false, error: 'Неверные учетные данные!' });
        }
      }
    );
  } catch (err) {
    res.json({ message: err.message });
    next(err);
  }
});

app.post('/api/data', urlencodedParser, async function (req, res, next) {
  try {
    if (!req.body) return new Error(`Необходимые данные на сервер не переданы!`);
    const { type, location, isOn, managerId } = req.body;

    await connection.execute(
      'INSERT INTO lights (`type`, `location`, `isOn`, `managerId`) VALUES (?,?,?,?)',
      [type, location, isOn, managerId],
      async function (err, results) {
        if (err) return new Error(`Ошибка при работе с БД!`);
        if (results) {
          await connection.execute(
            'SELECT * FROM lights ORDER BY id DESC',
            function (err, results) {
              if (err) return new Error(`Ошибка при работе с БД!`);
              if (results) {
                res.json(results);
              }
            }
          );
        }
      }
    );
  } catch (err) {
    res.json({ message: err.message });
    next(err);
  }
});

app.post('/api/changeLight', urlencodedParser, async function (req, res, next) {
  try {
    if (!req.body) return new Error(`Необходимые данные на сервер не переданы!`);
    const { id, isOn } = req.body;

    await connection.execute(
      'UPDATE lights SET isOn=? WHERE id=?',
      [isOn, id],
      async function (err, results) {
        if (err) return new Error(`Ошибка при работе с БД!`);
        if (results) {
          await connection.execute(
            'SELECT * FROM lights ORDER BY id DESC',
            function (err, results) {
              if (err) return new Error(`Ошибка при работе с БД!`);
              if (results) {
                res.json(results);
              }
            }
          );
        }
      }
    );
  } catch (err) {
    res.json({ message: err.message });
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500);
  res.render('error', { message: err.message });
});
