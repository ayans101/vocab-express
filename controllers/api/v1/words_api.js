const Word = require('../../../models/word');

module.exports.index = async function(req, res){
    let words = await Word.find({})
    .sort('-createdAt')

    return res.json(200, {
        message: "Lists of posts",
        success: true,
        data: {
            words: words
        }
    });
}