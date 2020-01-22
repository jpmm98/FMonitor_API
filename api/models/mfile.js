const mongoose = require('mongoose');

const fileDefine = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true},
    size : { type: Number, required: true},
    type : String,
    user : String,
})

module.exports = mongoose.model('File', fileDefine);