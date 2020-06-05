const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/photoapp",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( db => console.log("Database connected")).catch( err => console.log(err));