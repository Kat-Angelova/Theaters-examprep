const Play = require('../models/Play.js');

exports.create = async (playData) => {
    const pattern = new RegExp(`^${playData.title}$`, 'i')
    const existing = await Play.findOne({ title: { $regex: pattern }});

    if(existing) {
        throw new Error('A play with this name already exists!'); //proverka za unique dali ima takava piesa veche v bazara danni
    }

    return Play.create(playData);
};

exports.getTop3Plays = () => Play.find().sort({createdAt: -1}).limit(3).lean();

exports.getAllPlays = async (orderBy) => {
    let sort = { createdAt: -1 };

    if(orderBy == 'likes') {
        sort = { usersLiked: 'desc' }

    }
    return Play.find({ public: true }).sort({ createdAt: -1 }).lean();
   
};


exports.getOne = (playId) => Play.findById(playId).populate('usersLikedPlay');

exports.deletePlay = (playId) => Play.findByIdAndDelete(playId);

exports.editOne = (playId, playData) => Play.findByIdAndUpdate(playId, playData);