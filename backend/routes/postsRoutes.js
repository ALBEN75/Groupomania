const express = require('express');
const router = express.Router(); 

const postCtrl = require('../controllers/postsCtrl');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multerConfig');
router.post('/',multer, postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.get('/', postCtrl.getAllPosts);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);


module.exports = router; 