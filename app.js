require('dotenv');

const express = require('express');
const bodyParser = require('body-parser');

//create an instance of the express app
const app = express();

const routes = require('./routes/main');

//update express settings
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


//All routes will be handled by our routes module via middleware
app.use('/', routes);

//Catch all other routes
app.use((req, res, next) => {
    res.status(404);
    res.json({message: '404 - Not Found'});
});

//Handle Errors:
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({error: err});
});


//Start the server:
app.listen(process.env.PORT || 3008, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`)
})
