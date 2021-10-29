const express = require('express');

const { isAuthenticated } = require('../middlewares/authMiddleware.js');
const playService = require('../services/playService.js');

const router = express.Router();

const renderUserHomePage = async (req, res) => {
    let plays = await playService.getTop3Plays();

    res.render('home/user-home', { plays });
};

router.get('/home', isAuthenticated, renderUserHomePage);

module.exports = router;