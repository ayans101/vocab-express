const express = require('express');
const router = express.Router();
const wordsApi = require('../../../controllers/api/v1/words_api');

router.get('/', wordsApi.index);
router.post('/search', wordsApi.searchWords);

module.exports = router;