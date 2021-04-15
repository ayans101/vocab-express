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

module.exports.searchWords = async function(req, res){
    try{
        // console.log(req.query);
        // { text: 'abc' }
        
        await Word.find({ name: { $regex : new RegExp(req.query.text, "i") } }, (err, words) => {
            
            return res.json(200, {
                message: "Request successful!",
                success: true,
                data: {
                    words: words
                }
            });
            
        });

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal Server Error",
            success: false
        });
    }
}