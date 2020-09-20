const app = require('express').Router();

let connection = require('../config/db.config');
let constants = require('../config/constants');

app.route('/add-issue')
    .post(addIssue);

app.route('/list-issues')
    .get(listIssuesPage);

app.route('/update-issue/:id')
    .patch(updateIssue);


function getIssueById(id) {

    return new Promise((resolve, reject) => {

        const getQuery = `SELECT * from ${constants.issueTableName} WHERE ${constants.issueTableId} = ${id};`;
        connection.query(getQuery, (err, results, fields) => {

            if(err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * Update the issue with id sent in url and data sent in the request body
 * 
 */
async function updateIssue (req, res, next) {

    const id = parseInt(req.params.id);

    let issue = null;
    try {
        issue = await getIssueById(id); 
    } catch(err) {

        return res.status(500).json({
            success: false,
            error: err,
            message: 'Error getting issue by id'
        });
    }

    console.log(issue);

    if(issue.length === 0) {

        return res.status(204).json({
            success: true,
            message: 'No issue with that id'
        });
    } else {

        let updateQuery = `UPDATE issues SET `;

        if(!req.body.issueTitle || !req.body.issueDesc, !req.body.isOpen) {

            return res.status(400).json({
                success: false,
                message: 'issueTitle, issueDesc, isOpen required!'
            });
        }

        if(req.body.issueTitle) {
            updateQuery += `${constants.issueTitleColumn} = ${connection.escape(req.body.issueTitle)}, `;
        }
        if(req.body.issueDesc) {
            updateQuery += `${constants.issueDescriptionColumn} = ${connection.escape(req.body.issueDesc)}, `;
        }
        if(req.body.isOpen) {
            
            let open = 1;
            let op = parseInt(req.body.isOpen.trim());

            if(op === 1) {
                open = 1;
            } else if(op === 0) {
                open = 0;
            } else {

                return res.status(400).json({
                    success: false,
                    message: 'Invalid value for isOpen (choose 0 or 1)'
                })
            }

            updateQuery += `${constants.issueIsOpenColumn} = ${open} `;
        }

        updateQuery += `WHERE ${constants.issueTableId} = ${id};`;
        console.log(updateQuery);

        connection.query(updateQuery, (err, results, fields) => {

            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Server Error. Try Again'
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Issue Updated'
            });
        })
    }
}



function numberOfIssues() {
    
    return new Promise((resolve, reject) => {
        
        const maxCountQuery = `SELECT COUNT(*) AS maxRows FROM ${constants.issueTableName}`;
        connection.query(maxCountQuery, (err, results, fields) => {

            if(err) {
                reject(err);            
            }
            else {
                console.log(results);
                resolve(results[0].maxRows);
            }
            
        })
    })
}

/**
 * 
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next next middle ware
 * 
 * Lists all the endpoints in the database. 
 * Since there can be a lot of records in the database, 
 * return chunks of 10 records according to the
 * offset mentioned in params.
 */
function listIssuesPage (req, res, next) {

    let pageNumber = req.query.page;
    if(!pageNumber) {
        pageNumber = 0;
    }

    const offset = parseInt(pageNumber * 10);
    console.log('offeset', offset, '   jsgdhsgdhsgdhs');

    const getIssueQuery = `SELECT * FROM ${constants.issueTableName} LIMIT 10 OFFSET ${offset};`
    connection.query(getIssueQuery, async (err, results, fields) => {

        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Server Error. Try Again!'
            });
        }

        let totalIssues = null;
        try {
            totalIssues = await numberOfIssues();
        }
         catch(err) {
            console.log('err', err);
        }

        console.log(totalIssues, results);
        
        return res.status(201).json({
            success: true,
            message: 'Issues Received',
            data: {
                'issuesTotal': totalIssues,
                'issues': results
            }
        })
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * 
 * Adds a record in the database with all the data sent in the request body 
 */
function addIssue (req, res, next) {

    let issueTitle = req.body.issueTitle;
    let issueDesc = req.body.issueDesc;
    console.log(issueTitle, issueDesc);

    // const query = `SELECT * from ${connection.escape(constants.issueTableName)};`
    const query = `INSERT INTO ${constants.issueTableName} (
        ${constants.issueTitleColumn}, 
        ${constants.issueDescriptionColumn}
        ) values (
            ${connection.escape(issueTitle)}, 
            ${connection.escape(issueDesc)}
        );`
    console.log(query);

    connection.query(query, (err, results, fields) => {
        
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Server Error. Try Again!'
            });
        }

        console.log('results', results);
        
        return res.status(201).json({
            success: true,
            message: 'Issue Created',
            data: {
                insertedId: results.insertId
            }
        })
    })

    return;
}

module.exports = app