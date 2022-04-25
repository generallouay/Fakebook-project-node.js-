const router = require('express').Router()
const usersController = require('../controllers/users-controller');
const upload = require('../configurations/pictures');

router.get('/users', usersController.redirectToRoot);

router.get('/users/:id', usersController.getProfile);

router.post('/add-friend/:id' , usersController.addFriend);

router.post('/remove-friend/:id' , usersController.removeFriend);

router.post('/accept-friend/:id' , usersController.acceptFriend);

router.post('/cancel-req/:id', usersController.cancelRequest);

router.post('/upload-pfp',upload.single('profile-pic'), usersController.uploadImage);

router.post('/del-pfp', usersController.delPfp);

router.post('/edit-bio' , usersController.updateBio);

module.exports = router;