const fetch = require("node-fetch");

module.exports.addWord = function (req, res) {

    const app_id = "471da4cc"; // insert your APP Id
    const app_key = "4db4c087f7f72c0b540c3aff448e116a"; // insert your APP Key
    const fields = "definitions";
    const strictMatch = "true";
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
          console.log(json.results[0].lexicalEntries);
        } catch (error) {
          console.log(error);
        }
    })();

    return res.redirect("back");
};
