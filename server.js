const express = require('express') //HTTP Server
const bodyParser = require('body-parser') //HTTP -> JSON
const morgan = require('morgan') //Logger
const cors = require('cors') //CORS Headers

require('dotenv').config(); //Initialize environment vars


//Initializes express application
const app = express();
const port = process.env.PORT || 5000;

// ----------------------- END IMPORTS ----------------------- \\

//Parse JSON from HTTP
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

//CORS
app.use(
    cors({
        origin: "http://localhost:3000", // React App Location
        credentials: true,
    })
);

//Log HTTP Requests
app.use(morgan('dev'))

// ----------------------- END MIDDLEWARE ----------------------- \\

const dataRoute = require('./routes/data')
app.use('/data', dataRoute)

// ----------------------- END ROUTING ----------------------- \\

app.use((err, req, res, next) => { //Logs errors
    console.log(err)
    next();
})

app.listen(port, async () => { //Starts server
    console.log(`Server listening on port ${port}`)
});