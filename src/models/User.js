const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    status:Number,
    profile: {
        imgpath:String,
        nickname:String,
        description:String,
        photos: [{ type: Schema.Types.ObjectId, ref: "Photo"}]
    }
});

module.exports = mongoose.model("User", userSchema);