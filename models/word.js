const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    lexicalEntries: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});


const Word = mongoose.model('Word', wordSchema);

module.exports = Word;