///////////
//Client side of file controll
//////////


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const File = require('../models/mfile');

//GET all files on the Client side
router.get('/',(req, res, next) => {
    File.find({'user' : 'Client'})
    .select('_id name size type')
    .exec()
    .then( docs => {
        if(docs.length >= 0){
            const response = {
                count: docs.length,
                files: docs,
            }
            res.status(200).json(response);
            }else{
                res.status(204).json({
                    message: 'No files found'
                })
            }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});


//POST file to Client files
router.post('/',upload.single('file1'),(req, res, next) => {
    console.log(req.file);
    const file = new File({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        size : req.body.size,
        type : req.body.type,
        user : 'Client'
    })
    file
    .save()
    .then( result => {
        console.log(result);
        res.status(201).json({

            message : 'File added',
            AddedFile :  {
                id: result._id,
                name: result.name,
                size: result.size,
            }
    
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errror : err
        })
    });

    
});

//GET file by ID
router.get('/:fileID', (req, res, next) => {
    const id = req.params.fileID;
    File.findById(id)
    .select('_id name size type')
    .exec()
    .then( doc => {
        console.log(doc);
        if(doc){
        res.status(200).json(doc);
        }else{
            res.status(404).json({ messsage: 'No valid entry for this id'});
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    });
});

//Change a file parameter
router.patch('/:fileID', (req, res, next) => {
    const id =req.params.fileID;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    File.update({_id : id},{$set: updateOps})
    .exec()
    .then(result => {
        
        res.status(200).json({
            message:'Altered successfully'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//DELETE a file from Client
router.delete('/:fileID', (req, res, next) => {
    const id =req.params.fileID;
    File.deleteOne({_id: id})
    .exec()
    .then(result => {
        console.log()
        res.status(200).json({
            message: 'File deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
 });


module.exports = router;