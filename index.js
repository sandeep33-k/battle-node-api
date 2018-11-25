const express  		= require('express');
const Mongoose 		= require('mongoose');
const bodyParser    = require('body-parser');
const path          = require('path');
const helmet        = require('helmet');
require('./bootENV');

const key  = require('./key');

const app = express();


app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methodsccess-Control-Allow-Credentials",
		"true"
	);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

Mongoose.Promise = global.Promise;

Mongoose.connect(key._MONGODB_URL, { useMongoClient: true });
let db = Mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", () => {
    console.log("Database is Connected!");
    return db;
});



// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

// Setup Routes
/*  controller route  */
const router=require('./routes');
app.use(router);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
   res.sendFile(path.join(__dirname + '/error404.html'));
});


//error handlers
//development error handler
//will print stacktrace
app.use(function(err, req, res, next) {
	_LOGGER.info(err);
	_LOGGER.info('-----------******END******----------');
    res.send(_COMMON.parseERR(err.toString()));
});



app.listen(process.env.PORT || 5000, function() {
	console.log("Server is Started!");
});
