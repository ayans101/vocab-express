const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vocab_development', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open',function(){
    console.log("Connected to Database :: MongoDB");
});

module.exports = db;