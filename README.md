# Issue Tracking
## SQL Setup


- Run MySQL server
- execute following statements to make a user
	* create user 'issues'@'localhost' IDENTIFIED by 'pass';
	* create database issue;
	* grant all privileges on issue.* to 'issues'@'localhost';
	* ALTER USER 'issues'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass';
(use if database is not connected)

- Run
```
  - Node Server
$ npm i
$ npm start
  - For React Server
$ cd issues/
$ npm i 
$ npm start
```