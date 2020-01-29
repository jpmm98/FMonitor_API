const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');


const clientFilesRoutes = require('./api/routes/filesClient');
const serverFilesRoutes = require('./api/routes/filesServer');
const transfersRoutes = require('./api/routes/transfers');

mongoose.connect('mongodb+srv://AdminAdmin:'+ 
    process.env.MONGO_ATLAS_PW +
    '@comapi-fssqk.gcp.mongodb.net/test?retryWrites=true&w=majority',
    {
        useUnifiedTopology : true,
        useNewUrlParser : true
    }
   
)

app.use(morgan('dev'));
app.use('/client_files/upload', express.static('upload/client'));
app.use('/server_files/upload', express.static('upload/server'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Preventing CORS errors  || Cross-Origin Resource Sharing
app.use((req, res, next) => {
    res.header('Access-Control-Allow','*');
    res.header(
    'Access-Control-Allow',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/client_files', clientFilesRoutes);
app.use('/server_files', serverFilesRoutes);
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

