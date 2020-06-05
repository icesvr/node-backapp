const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({
    path:String,
    description:String,
    createAt:Date,
    likes:Number,
    user : {type: mongoose.Types.ObjectId, ref: "User"}
})

module.exports = mongoose.model("Photo", photoSchema);