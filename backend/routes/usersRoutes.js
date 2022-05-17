const express = require('express');
const router = express.Router(); 

const userCtrl = require('../controllers/usersCtrl');


router.post('/signup', userCtrl.signup);
router.get('/test', userCtrl.test);

module.exports = router; 
