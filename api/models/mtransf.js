const mongoose = require('mongoose');

const transferDefine = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    fileID : { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true},
    sender :{ type:String},
    receiver : { type:String, required : true},
    
})

module.exports = mongoose.model('Transfer', transferDefine);