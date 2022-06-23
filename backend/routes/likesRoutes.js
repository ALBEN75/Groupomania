const express = require('express');
const router = express.Router(); 

const likeCtrl = require('../controllers/likeCtrl');

router.post('/:id', likeCtrl.like);
router.delete('/:id/:UserId', likeCtrl.dislike);


module.exports = router; 