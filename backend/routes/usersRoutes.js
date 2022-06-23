const express = require('express');
const router = express.Router(); 

const userCtrl = require('../controllers/usersCtrl');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/profile', userCtrl.modifyUser);

module.exports = router; 
