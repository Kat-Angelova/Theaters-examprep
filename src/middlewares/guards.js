const playService = require('../services/playService.js');

exports.isOwner = async function(req, res, next) {
    let play = await playService.getOne(req.params.playId);

    if(play.creator == req.user._id) {
        next()
    } else {
        res.redirect(`/play/details/${req.params.playId}`);
    }
};

exports.isNotOwner = async function(req, res, next) {
    let play = await playService.getOne(req.params.playId);
   
    if(play.creator != req.user._id) {
        next();
    } else {
        res.redirect(`/play/details/${req.params.playId}`);
    }
};
