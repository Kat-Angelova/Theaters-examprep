const express = require('express');

const homeGuestController = require('./controllers/homeGuestController.js');
const homeUserController = require('./controllers/homeUserController.js');
const authController = require('./controllers/authController.js');
const playController = require('./controllers/playController.js');

const router = express.Router();

router.use(homeGuestController);
router.use('/guest', homeGuestController);
router.use('/user', homeUserController);
router.use('/auth', authController);
router.use('/play', playController);

// router.use('*', (req, res) => {
//     res.render('404');
// });

module.exports = router;