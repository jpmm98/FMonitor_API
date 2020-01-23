const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Transfer = require('../models/mtransf');
const File = require('../models/mfile');

router.get('/', (req, res, next) => {
    Transfer.find()
    .select('receiver fileID _id')
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            transfer: docs.map(doc =>{
                return { 
                    _id : doc._id,
                    fileID: doc.fileID,
                    receiver: doc.receiver,

                }

            }),
            
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
});

router.post('/', (req, res, next) => {
    File.findById(req.body.fileID)
    .then(fileR =>{ 
        if(!fileR){
            return res.status(404).json({
                message: 'File not found',
            })
        } 
        const transf = new Transfer({
            _id: mongoose.Types.ObjectId(),
            receiver: req.body.receiver,
            fileID: req.body.fileID,
        });
        return transf.save()
    
    })
    .then(result => {
        console.log(result);1
        res.status(201).json({
            message: 'Transferencia adicionada',
            Tranferencia: {
                _id: result._id,
                fileID: result.file,
                receiver: result.receiver,
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
            });
        });

});


router.get('/:transfID', (req, res, next) => {
   
    res.status(200).json({
        message: 'Transfer details',
        transferID: req.params.transfID 
    });
});


router.delete('/:transfID', (req, res, next) => {
   
    res.status(200).json({
        message: 'Transfer details Deleted',
        transferID: req.params.transfID
    });
});

module.exports = router;