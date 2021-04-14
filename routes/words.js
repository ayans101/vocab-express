const express = require("express");
const router = express.Router();

const wordsController = require("../controllers/words_controller");

router.post("/add-word", wordsController.addWord);

module.exports = router;
