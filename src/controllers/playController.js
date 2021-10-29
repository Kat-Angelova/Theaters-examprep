const express = require('express');

const playService = require('../services/playService.js');
const { getErrorMessage } = require('../config/errorHandler.js');
const { isAuthenticated } = require('../middlewares/authMiddleware.js');
const { isOwner, isNotOwner } = require('../middlewares/guards.js');

const router = express.Router();

//create
const renderCreatePlay = (req, res) => {
    res.render('play/create');
};

const postCreatePlay = async (req, res) => {
    try {
        await playService.create({ ...req.body, creator: req.user._id });

        res.redirect('/user/home');
    } catch (error) {
        res.render('play/create', { error: getErrorMessage(error)})
    }

};

//details
const getDetails = async (req, res) => {
    let play = await playService.getOne(req.params.playId);
    let playData = await play.toObject();

    const isCreator = playData.creator == req.user?._id;
    const usersLikes = play.getUsersLikes();

    const isLikedByMe = play.usersLikedPlay.some(x => x._id == req.user?._id);

    res.render('play/details', { ...playData, isCreator, usersLikes, isLikedByMe})
};

//like

const likePlay = async (req, res) => {
    let play = await playService.getOne(req.params.playId);

    play.usersLikedPlay.push(req.user._id);
    
    await play.save();

    res.redirect(`/play/details/${req.params.playId}`);
};

//delete

const deletePlay = async (req, res) => {
    await playService.deletePlay(req.params.playId);

    res.redirect('/user/home');
};

//edit

const renderEditPlay = async (req, res) => {  
    let play = await playService.getOne(req.params.playId);

    res.render('play/edit', { ...play.toObject()});
};

const postEditPlay = async (req, res) => {
    await playService.editOne(req.params.playId, req.body);

    res.redirect(`/play/details/${req.params.playId}`);
}


router.get('/create', isAuthenticated, renderCreatePlay);
router.post('/create', isAuthenticated,  postCreatePlay);

router.get('/details/:playId', isAuthenticated, getDetails);
router.get('/like/:playId', isNotOwner, likePlay);

router.get('/delete/:playId', isOwner, deletePlay);

router.get('/edit/:playId', isOwner, renderEditPlay);
router.post('/edit/:playId', isOwner, postEditPlay);


module.exports = router;