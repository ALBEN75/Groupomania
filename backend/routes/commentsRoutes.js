const express = require('express');
const router = express.Router(); 

const commentCtrl = require('../controllers/commentsCtrl');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multerConfig');

router.post('/', multer, commentCtrl.createComment);
router.delete('/:id', commentCtrl.deleteComment);


module.exports = router; 