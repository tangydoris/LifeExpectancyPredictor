
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override');

var app = express();

app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') == 'development') {
	app.locals.pretty = true;
}


/**
 * Watson setup
 **/
var watson = require('watson-developer-cloud');
//var extend = require('util')._extend;
//var i18n = require('i18next');

//i18n settings
require('./config/i18n')(app);

// error-handler settings
//require('./config/error-handler')(app);

// Bootstrap application settings
//require('./config/express')(app);

// Create the service wrapper
var personality_insights = watson.personality_insights({
	version: 'v2',
	username: 'dab272b3-b5bc-4928-a741-cea73b4d04e0',
	password: 'FGBkYqWLL4o5'
});


/**
 * Twitter setup
 **/
var Twit = require('twitter');

/**
 * Path setup
 **/
app.get('/gettweets', function(req, res, next){
	var query = req.query;

	var result = {
		consumer_key: query.consumer_key,
		consumer_secret: query.consumer_secret,
		access_token: query.access_token,
		access_secret: query.access_secret,
		user_name: query.user_name
	};

	var params = {screen_name: result.user_name, count: 50};

	console.log("Parsed result");
	console.log(result);

	var T = new Twit({
	    consumer_key: 			result.consumer_key,
	    consumer_secret:    	result.consumer_secret,
	    access_token_key: 		result.access_token,
		access_token_secret: 	result.access_secret,
	});

	// Fetch tweets for user
	T.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
			var resultsArray = [];
			//console.log(tweets);
			for (var i=0; i<tweets.length; i++) {
				var tweet = tweets[i];
				var text = tweet.text;
				for (var j=0; j<100; j++)
					text = text+" of";

				// WATSON STUFF
				personality_insights.profile({
					text: text,
					language: 'en'},
					function (err, response) {
					if (err)
					  console.log('error:', err);
					else
					  console.log(JSON.stringify(response, null, 2));
				});
				
			}

			res.json({'events': resultsArray});
		}
	});
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  	console.log("Express server listening on port " + app.get('port'));
});
