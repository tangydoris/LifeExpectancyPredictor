/**
 * Watson setup
 **/
var Twitter = require('twitter');
var watson = require('watson-developer-cloud');
var async = require('async');
var moment = require('moment');
var jsonfile = require('jsonfile');
var util = require('util');

var alchemy_language = watson.alchemy_language({
  api_key: 'API KEY'
});


function sentimentAnalysis(tweet, index) {
  return function(callback) {
    alchemy_language.sentiment({text: tweet.text }, function (err, sentiment) {
      if (err) {
        //console.log('error getting sentiment:', err);
        callback(null, null);
        return
      } else {
        var life = (sentiment && sentiment.docSentiment.score) ? sentiment.docSentiment.score * 1000 : 0;
        var epochTime = convertToEpoch(tweet.created_at);
        callback(null, {
          short_text: tweet.text,
          time_stamp: epochTime,
          time_adj: life
        });
      }
    });
  }
}

// Convert twitter time format to epoch millisec
function convertToEpoch(twitterTime) {
  moment().format();
  // gives epoc time
  // twitter format: "Sun Nov 08 22:48:08 +0000 2015"
  var tokens = twitterTime.split(" ");
  var monthsString = "JanFebMarAprMayJunJulAugSepOctNovDec";
  var month = monthsString.indexOf(tokens[1])/3 + 1;
  moment(month+"-"+tokens[2]+"-"+tokens[5], "MM-DD-YYYY");
  return moment().valueOf();
}

// calculates for every tweet
function lifeExpectancyCalculator(twit, params, callback) {
  var resultsArray ;


  twit.get('statuses/user_timeline', params, function(error, tweets, response) {
    //console.log('tweets:',tweets.length);
    if (error) {
      callback(error);
    } else {
      async.parallel(tweets.map(sentimentAnalysis), function(err, results) {
        callback(null, results.filter(function (e) { return e !== null }));
      });
    }
  });
  

  // var file = '/tweets.json'
  // jsonfile.readFile(file, function(err, obj) {
  //   if (err != null) {
  //     callback(err);
  //   } else {
  //     var sents = obj;
  //     console.log(sents);

  //     callback(null, sents.filter(function (e) { return e !== null }));
  //     /*
  //     async.parallel(sents.map(sentimentAnalysis), function(error, results) {
  //       callback(null, results.filter(function (e) { return e !== null }));
  //     });
  //     */
  //   }
  // });

  /*
  var file = './tweets.json'
  jsonfile.readFile(file, function(err, obj) {
    if (err != null) {
      callback(error);
    } else {
      var tweets = obj;
      console.log(tweets);
      async.parallel(tweets.map(sentimentAnalysis), function(err, results) {

        callback(null, results.filter(function (e) { return e !== null }));
      });
    }
  })
  */
}

// use Watson personality insights
var personality_insights = watson.personality_insights({
  username: 'USERNAME',
  password: 'PASSWORD',
  version: 'v2'
});


// calculates overall personality with one large tweet
function personalityCalculator(resultsArray, callback) {
  var time = 0;
  var totalString = '';
  totalString = resultsArray.map(function(e) {return e.short_text;}).join(' ');

  personality_insights.profile({ text: totalString },
    function (err, response) {
      if (err) {
        console.log('error:', err);
        callback(err, time);
      }
      else {
        // process json result
        var bigFive = big5(response);
        console.log(bigFive);
        var times = bigFive.map(function(e) {
          return (e.value > 0.5 ? 500 : -500);
        });
        time += eval(times.join('+'));
        callback(null, time);
      }
    }
  );
}

var big5 = function(tree) {
  var profile = typeof (tree) === 'string' ? JSON.parse(tree) : tree;
  var _big5 = profile.tree.children[0].children[0].children;
  return _big5.map(function(trait) {
      return { name: trait.name, value: trait.percentage };
  });
};

module.exports = function(req, res, next) {
  var params = {
    screen_name: req.query.user_name, 
    count: (req.query.count || 200)
  };
  
  var twitter = new Twitter({
    consumer_key:           req.query.consumer_key,
    consumer_secret:        req.query.consumer_secret,
    access_token_key:       req.query.access_token,
    access_token_secret:    req.query.access_secret,
  });

  // lifeExpectancyCalculator(twitter, params, function (error, results) {
  //   if (error)
  //     res.status(400).json({error: 'there was an error' + error});
  //   else {
  //     // after calculating insight for every tweet, calculate overall personality
  //     var overall_time_adj = personalityCalculator(results, function(err, timeResult){
  //       // even if there is an error, timeResult = 0  
  //       var file = './sentiments.json';
  //       jsonfile.writeFile(file, results, function (err) {
  //         console.error(err)
  //       });
  //       res.json({events: results, overall_time_adj: timeResult});
  //     });

      
  //   }
  // });
  var file = './sentiments.json';
  jsonfile.readFile(file, function(err, obj) {
    if (err != null) {
      callback(error);
    } else {
      var sentiments = obj;
      console.log(sentiments);

      personalityCalculator(sentiments, function(err, resp) {
        res.json({events: sentiments, overall_time_adj: resp});
      });
      
      /*
      async.parallel(personalityCalculator(sentiments), function(err, results) {
        res.json({events: sentiments, overall_time_adj: results});
      });
      */

      /*
      twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        //console.log('tweets:',tweets.length);
        if (error) {
          callback(error);
        } else {
          async.parallel(personalityCalculator(sentiments), function(err, results) {
            res.json({events: sentiments, overall_time_adj: results});
          });
        }
      });
*/
      
    }
  })
}
