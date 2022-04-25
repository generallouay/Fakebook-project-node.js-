const router = require('express').Router();

const postController = require('../controllers/post-controller');

router.post('/new-post' , postController.createPost);

router.post('/post-edit/:id', postController.editPost);

router.post('/delete-post/:id', postController.deletePost);

router.post('/like' , postController.likePost);

module.exports = router;