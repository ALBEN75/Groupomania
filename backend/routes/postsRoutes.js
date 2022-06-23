const express = require('express');
const router = express.Router(); 

const postCtrl = require('../controllers/postsCtrl');
const multer = require('../middlewares/multerConfig');

router.post('/',multer, postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.get('/', postCtrl.getAllPosts);
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);


module.exports = router; 