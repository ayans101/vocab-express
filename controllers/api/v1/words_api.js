const Word = require('../../../models/word');
const fetch = require("node-fetch");

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

module.exports.addWord = async function (req, res) {
    try {
        await Word.findOne({name: req.query.text.toLowerCase()}, function(err, word) {
            // if(err) {
            //     console.log(err);
            // }
            if(word) {
                return res.json(422, {
                    message: "Word already there in your list",
                    success: false
                });
            }
            else {

                const app_id = "471da4cc"; // insert your APP Id
                const app_key = "4db4c087f7f72c0b540c3aff448e116a"; // insert your APP Key
                const fields = "definitions";
                const strictMatch = "false";
                const language = 'en-gb';
                const word_id = req.query.text;
                const url = 'https://od-api.oxforddictionaries.com:443/api/v2/entries/' + language + '/' + word_id.toLowerCase() + '?fields=' + fields + '&strictMatch=' + strictMatch;
        
                // retrieve definitions of the word
                (async () => {
                    try {
                        const response = await fetch(url, {
                            headers: {
                                'app_id': app_id,
                                'app_key': app_key
                            }
                        });
                        const json = await response.json();
                        if(json.error){
                            //  No entry found matching this word
                            console.log(json);
                            return res.json(422, {
                                message: "Word doesn't exist",
                                success: false
                            });
                        }
                        else {
                            // add the word to the database
                            await Word.create({
                                name: req.query.text.toLowerCase(),
                                lexicalEntries: json.results[0].lexicalEntries
                            }, function(err, word){
                                return res.json(200, {
                                    message: "Word added successfully",
                                    success: true,
                                    data: {
                                        word: word
                                    }
                                });
                            });

                        }
                    } catch (error) {
                        console.log(error);
                    }
                })();
            } 
        });

    }catch(err) {
        console.log(err);
        return res.json(500, {
            message: "Internal Server Error",
            success: false
        });
    }
};
