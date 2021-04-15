const express = require("express");
const router = express.Router();

router.use("/words", require("./words"));

module.exports = router;
