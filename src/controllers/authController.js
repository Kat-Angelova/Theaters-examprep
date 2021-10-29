const express = require('express');

const { AUTH_COOKIE_NAME } = require('../constants.js');
const authService = require('../services/authService.js');
const { getErrorMessage } = require('../config/errorHandler.js');
const { isAuthenticated, isGuest} = require('../middlewares/authMiddleware.js');

const router = express.Router();

const renderRegister = (req, res) => {
    res.render('auth/register');
};

const postRegister = async (req, res) => {
    const { username, password, rePass } = req.body;

    if(password !== rePass) {
        res.locals.error = 'Password do not match!';

        return res.render('auth/register');
    }

    try {
        await authService.register({ username, password });

        let token = await authService.login({
            username,
            password,
        });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/user/home');
        
    } catch (error) {
        res.render('auth/register', { error: getErrorMessage(error) });
        
    }
};

const renderLogin = (req, res) => {
    res.render('auth/login');
};

const postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });
        res.cookie(AUTH_COOKIE_NAME, token);
        
        res.redirect('/user/home');
    } catch (error) {
        res.render('auth/login', { error: error.message});
    }
};

const getLogout = (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/guest/home');
};

router.get('/register', isGuest, renderRegister);
router.post('/register', isGuest, postRegister);

router.get('/login', isGuest, renderLogin);
router.post('/login', isGuest, postLogin);

router.get('/logout', isAuthenticated ,getLogout);

module.exports = router;