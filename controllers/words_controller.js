const http = require("https");

module.exports.addWord = function (req, res) {

    // retrieve definitions of the word
    const app_id = "471da4cc"; // insert your APP Id
    const app_key = "4db4c087f7f72c0b540c3aff448e116a"; // insert your APP Key
    const wordId = req.body.word;
    const fields = "definitions";
    const strictMatch = "true";

    const options = {
        host: 'od-api.oxforddictionaries.com',
        port: '443',
        path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
        method: "GET",
        headers: {
            'app_id': app_id,
            'app_key': app_key
        }
    };

    http.get(options, (resp) => {
        let body = '';
        resp.on('data', (d) => {
            body += d;
        });
        resp.on('end', () => {
            console.log(body);
        });
    });

    return res.redirect("back");
};
