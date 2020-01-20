const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET all transfers'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Adicionada uma tranferencia'
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