const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1/MyArts')
    .then(x => console.log('Connected to DB'))
    .catch(x => console.log('Problems to connect Mongo DB'));