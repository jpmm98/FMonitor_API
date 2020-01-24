const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Transfer = require('../models/mtransf');
const File = require('../models/mfile');

router.get('/', (req, res, next) => {
    Transfer.find()
    .select('receiver file _id')
    .populate('file')
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            transfer: docs.map(doc =>{
                return { 
                    _id : doc._id,
                    file: doc.file,
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
    File.findById(req.body.file)
    .then(fileR =>{ 
        if(!fileR){
            return res.status(404).json({
                message: 'File not found',
            })
        } 
        const transf = new Transfer({
            _id: mongoose.Types.ObjectId(),
            receiver: req.body.receiver,
            file: req.body.file,
        });
        return transf.save()
    
    })
    .then(result => {
        console.log(result);1
        res.status(201).json({
            message: 'Transferencia adicionada',
            Tranferencia: {
                _id: result._id,
                file: result.file,
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
    Transfer.findById(req.params.transfID)
    .populate('file')
    .exec()
    .then(transf =>{
        if(!transf){
           return res.status(404).json({
                message: 'No transfer with this id'
            })
        }
        res.status(200).json({
            Transfer : transf
        })
    })
    .catch(err => {
        res.status(500).json({
            
            error: err
        })
    })
});


router.delete('/:transfID', (req, res, next) => {
    const tid = req.params.transfID
    Transfer.deleteOne({_id: tid})
    .exec()
    .then(result =>{
        if(!result){
            return res.status(404).json({
                message: 'No transfer with this id'
            })
        }
        res.status(200).json({
            message: 'Deleted with success'   
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;