const app = require('express').Router();


// rouotes import
const issueRoutes = require('./issueRoutes');

app.use('/issues', issueRoutes);

module.exports = app;