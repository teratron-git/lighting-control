let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
let config = require('../config/serverConfig');
let routes = require('./routes');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

app.listen(process.env.PORT || config.port, function () {
  console.log('Сервер запущен...');
});

app.use(express.static(path.join(__dirname, '..', 'build')));

app.use('/api', routes);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).json('error', { message: err.message });
});
