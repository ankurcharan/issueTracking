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

	dbConn.query(`CREATE table IF NOT EXISTS issues (
			title varchar(300) NOT NULL,
			body varchar(3000),
			isopen int(1) DEFAULT(1),
			id int auto_increment primary key
		);`,
		(err, results) => {

			if(err) {

				console.log(err);
				console.log('Try setting up database manually');
			}
		})
});

module.exports = dbConn;