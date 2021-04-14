const fetch = require("node-fetch");
const Word = require('../models/word');

module.exports.addWord = async function (req, res) {
    try {
        await Word.findOne({name: req.body.word.toLowerCase()}, function(err, word) {
            if(err) {
                console.log(err);
            }

            if(!word) {

                const app_id = "471da4cc"; // insert your APP Id
                const app_key = "4db4c087f7f72c0b540c3aff448e116a"; // insert your APP Key
                const fields = "definitions";
                const strictMatch = "false";
                const language = 'en-gb';
                const word_id = req.body.word;
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
                        }
                        else {
                            // add the word to the database
                            await Word.create({
                                name: req.body.word.toLowerCase(),
                                lexicalEntries: json.results[0].lexicalEntries
                            });

                        }
                    } catch (error) {
                        console.log(error);
                    }
                })();
            } 
            return res.redirect("back");
        });

    }catch(err) {
        console.log(err);
        return res.redirect('back');
    }
};
