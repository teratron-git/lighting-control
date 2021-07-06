const express = require('express');
const router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const mainController = require('../controllers/mainController');

router.get('/getAllLights', mainController.getAllLights);

router.post('/login', urlencodedParser, mainController.login);
router.post('/addLight', urlencodedParser, mainController.addLight);
router.post('/changeLightStatus', urlencodedParser, mainController.changeLightStatus);

module.exports = router;
