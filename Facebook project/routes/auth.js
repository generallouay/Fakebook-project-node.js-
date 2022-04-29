const router = require('express').Router()
const authController = require('../controllers/auth-controller');


// finished (need to add csfr)
router.get('/register', authController.getSignup);

// finished (need to add csfr)
router.post('/register', authController.createUser)


router.get('/login', authController.getLogin)


router.post('/login', authController.logTheUserIn)


router.post('/logout', authController.logTheUserOut)


module.exports = router;