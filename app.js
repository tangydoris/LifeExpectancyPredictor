
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
 * Twitter setup
 **/
//var Twit = require('twit');
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

	var params = {screen_name: result.user_name};

	console.log("Parsed result");
	console.log(result);

	//var T = new Twit({
	var T = new Twit({
	    consumer_key: 			result.consumer_key,
	    consumer_secret:    	result.consumer_secret,
	    access_token_key: 			result.access_token,
		access_token_secret: 	result.access_secret,
	});

	// Fetch tweets for user
	T.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
			var resultsArray = [];
			console.log(tweets);
			for (var tweet in tweets) {
				console.log(tweet);
			}
			res.json({'events': resultsArray});
		}
	});
});

app.get('/', routes.index);






/**
 * Function to process Twitter Object
 * and send through to IBM Watson 'Personality Insights' API
 **/
 function processTweet(tweet) {
 	var text = tweet.text;
 }

 var options = { screen_name: 'tangydoris',
                count: 3 };


http.createServer(app).listen(app.get('port'), function(){
  	console.log("Express server listening on port " + app.get('port'));
 

});
