const express = require('express');
const router = express.Router();


router.get('/',(req, res, next) => {
    res.status(200).json({

        message: 'GET all files'


    });
});


router.post('/',(req, res, next) => {
    res.status(201).json({

        message: 'File added'


    });
});

router.get('/:fileID', (req, res, next) => {
    const id = req.params.fileID;
    if(id === 'special'){
        res.status(200).json({ 
            message: 'Secret ID',
            id : id
        });
    } else {
        res.status(200).json({
            message: 'ID Passed',
            id: req.params.fileID
        });
    }
});

router.patch('/:fileID', (req, res, next) => {
   res.status(200).json({
       message: 'updated file info'
   });
});


router.delete('/:fileID', (req, res, next) => {
    res.status(200).json({
        message: 'deleted file'
    });
 });

module.exports = router;