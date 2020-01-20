const express = require ('express');
const app = express();
const morgan = require('morgan');


const monfileRoutes = require('./api/routes/monfile');
const transfersRoutes = require('./api/routes/transfers');

app.use(morgan('dev'));

app.use('/monfile', monfileRoutes);
app.use('/transfers', transfersRoutes);



//Error handling
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status= 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});
//


app.use((req, res, next) =>{

    res.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;

