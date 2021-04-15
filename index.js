const express = require('express');
const app = express();
const port = 1000;
const db = require('./config/mongoose');
const cors = require('cors');

app.use(cors());    //  add CORS allow cross-origin requests from my API
app.use(express.urlencoded({ extended: false }));

//  set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//  use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
});