const mongoose = require('mongoose');

const transferDefine = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    file : { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true},
    receiver : { type:String, required : true},
    
})

module.exports = mongoose.model('Transfer', transferDefine);