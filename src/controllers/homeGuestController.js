const express = require('express');

const { isGuest } = require('../middlewares/authMiddleware.js');
const playService = require('../services/playService.js');

const router = express.Router();

const renderGuestHomePage = async (req, res) => {
    let plays = await playService.getTop3Plays();

    res.render('home/guest-home', { plays });
};

router.get('/home', isGuest, renderGuestHomePage);

module.exports = router;