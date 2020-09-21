const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();


const routes = require('./routes');


app.use(cors({
	origin: true
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())



app.use('/', routes);

app.use((req, res, next) => {

	return res.status(404).json({
		success: 'Use routes'
	})
})

// listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server http://localhost:${port}`);
});