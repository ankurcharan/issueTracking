'use strict';

const mysql = require('mysql');

const dbConn = mysql.createConnection({
	host     : 'localhost',
	user     : 'issues',
	password : 'pass',
	database : 'issue'
});

dbConn.connect((err) => {
	if (err) {
		throw err;
	} 
	console.log("Database Connected!");
});

module.exports = dbConn;