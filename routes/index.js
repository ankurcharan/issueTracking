const app = require('express').Router();


const bodyParser = require('body-parser');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())



// rouotes import
const issueRoutes = require('./issueRoutes');

app.use('/issues', issueRoutes);

module.exports = app;