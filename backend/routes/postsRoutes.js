const express = require('express');
const router = express.Router(); 

const postCtrl = require('../controllers/postsCtrl');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multerConfig');

router.post('/', multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likeOrDislikePost);

module.exports = router; 