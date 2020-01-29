const mongoose = require('mongoose');

const fileDefine = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true},
    size : { type: Number, required: true},
    user : String,
    file : { type: String, required: true},
})

module.exports = mongoose.model('File', fileDefine);