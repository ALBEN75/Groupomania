const express = require('express');
const router = express.Router(); 

const logCtrl = require('../controllers/logsCtrl');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multerConfig');

router.post('/', auth, multer, logCtrl.createLog);
router.get('/:id', auth, logCtrl.getOneLog);
router.get('/', auth, logCtrl.getAllLogs);
router.put('/:id', auth, multer, logCtrl.modifyLog);
router.delete('/:id', auth, logCtrl.deleteLog);
router.post('/:id/like', auth, logCtrl.likeOrDislikeLog);

module.exports = router; 