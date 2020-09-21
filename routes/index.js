const app = require('express').Router();

// routes import
const issueRoutes = require('./issueRoutes');

app.use('/issues', issueRoutes);

module.exports = app;