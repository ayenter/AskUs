var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var router = express.Router();
var port = 3000;
var db = {
            users:[
              {username: "Ironman", password:"111", email:"test1@gmail.com"},
              {username: "Hulk", password: "1111", email:"test2@gmail.com"},
              {username: "CaptainAmerica", password: "1234", email:"test3@gmail.com"}
            ],

            questions:[
              {
                qid: 0,
                question:"Where should I eat in Vegas?", 
                descript:"Gonna be in Vegas for spring break. Give me tips on where to eat without breaking the bank!", 
                author:"CaptainAmerica", 
                time: "Mon Mar 23 2015 22:21:01 GMT-0700 (PDT)",
                tag: "food", 
                responses:[
                  {rid: 0, response: "McDonalds there is the bomb! Check it out!", upvotes:[], downvotes:[], author:"Ironman", time: "Mon Mar 23 2015 22:21:01 GMT-0700 (PDT)"}
                ],
                active: true
              },
              {
                qid: 1,
                question: "What is a good movie to watch?",
                descript: "I'm hanging out with some friends later tonight.  What is a good entertaining action movie to watch?",
                author: "Hulk",
                time: "Fri Mar 27 2015 11:11:11 GMT-0700 (PDT)",
                tag: "entertainment",
                responses: [
                  {rid: 0, response: "Why don't you watch the Avengers?", upvotes: [], downvotes:[], author: "CaptainAmerica", time: "Fri Mar 27 2015 11:13:11 GMT-0700 (PDT)"},
                  {rid: 1, response: "Any Ironman movie will be far more superior entertainment than what anyone else suggests.", upvotes: [], downvotes: [], author: "Ironman", time: "Fri Mar 27 12:12:12 GMT-0700 (PDT)"}
                ],
                active: true
              }
            ],

            tabs: ["new", "travel", "food", "entertainment", "relationship", "career", "life", "other", "myquestions"]
          };

// Setup view engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

//Set up session
//Change session storage to real db in production
app.use(session({secret: 'Victoria'}));

//Set up to parse POST data
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//Set up
app.use(express.static(path.join(__dirname, '/public')));
app.use(router);

//Make db available to all templates
app.locals.db = db;

/* Routes for home page. */
router.route('/')
  .get(function(req, res) {
    if(req.session.validUser){
      res.render('index', { title: 'AskUs!-Homepage', user: req.session.username, activeTab: "new"});
    }else{
      res.render('login', { title: 'AskUs!-Login', promptFail: req.session.msg});
    } 
  })
  .post(function(req, res) {
    if(req.session.validUser){
      //Add question
      var newQuestion = {
        qid: db.questions.length,
        question: req.body.question,
        descript: req.body.descript,
        tag: req.body.tag,
        author: req.body.username,
        time: Date(), //Verify timezone later
        responses: [],
        active: true
      }
      db.questions.push(newQuestion);
      res.render('index', { title: 'AskUs!-Homepage', user: req.session.username, activeTab: 'new'});
    }else{
      res.render('login', { title: 'AskUs!-Login', promptFail: 'Only members can ask questions.'});
    }
  });

router.route('/new')
  .get(function(req, res){
    if(req.session.validUser){
      res.render('index', {title: 'AskUs!-New', user: req.session.username, activeTab: "new"});
    } else{
      res.render('login', {title: 'AskUs!-Login', promptFail: req.session.msg});
    }
  });

router.route('/travel')
  .get(function(req, res){
    if(req.session.validUser){
      res.render('index', {title: 'AskUs!-Travel', user: req.session.username, activeTab: "travel"});
    } else{
      res.render('login', {title: 'AskUs!-Login', promptFail: req.session.msg});
    }
  });

router.route('/food')
  .get(function(req, res){
    if(req.session.validUser){
      res.render('index', {title: 'AskUs!-Travel', user: req.session.username, activeTab: "food"});
    } else{
      res.render('login', {title: 'AskUs!-Login', promptFail: req.session.msg});
    }
  });

router.route('/entertainment')
  .get(function(req, res){
    if(req.session.validUser){
      res.render('index', {title: 'AskUs!-Travel', user: req.session.username, activeTab: "entertainment"});
    } else{
      res.render('login', {title: 'AskUs!-Login', promptFail: req.session.msg});
    }
  });

router.route('/relationship')
  .get(function(req, res){
    if(req.session.validUser){
      res.render('index', {title: 'AskUs!-Travel', user: req.session.username, activeTab: "relationship"});
    } else{
      res.render('login', {title: 'AskUs!-Login', promptFail: req.session.msg});
    }
  });

router.route('/career')
  .get(function(req, res){
    if(req.session.validUser){
      res.render('index', {title: 'AskUs!-Travel', user: req.session.username, activeTab: "career"});
    } else{
      res.render('login', {title: 'AskUs!-Login', promptFail: req.session.msg});
    }
  });

router.route('/life')
  .get(function(req, res){
    if(req.session.validUser){
      res.render('index', {title: 'AskUs!-Travel', user: req.session.username, activeTab: "life"});
    } else{
      res.render('login', {title: 'AskUs!-Login', promptFail: req.session.msg});
    }
  });

router.route('/other')
  .get(function(req, res){
    if(req.session.validUser){
      res.render('index', {title: 'AskUs!-Travel', user: req.session.username, activeTab: "other"});
    } else{
      res.render('login', {title: 'AskUs!-Login', promptFail: req.session.msg});
    }
  });

router.route('/myquestions')
  .get(function(req, res){
    if(req.session.validUser){
      res.render('index', {title: 'AskuUs!-My Questions', user: req.session.username, activeTab: "myquestions"});
    } else{
      res.render('login', {title: 'AskUs!-Login', promptFail: req.session.msg});
    }
  });

/* Routes to view a question. */
router.route('/question/:id')
  .get(function(req, res) {
    if(req.session.validUser){
      var index = 0;
      for (var i = 0; i < db.questions.length; i++) {
        if (db.questions[i].qid == req.params.id){
          index = i;
        }
      }
      res.render('question', { title: 'AskUs!', myQid:index, user: req.session.username});
    }else{
      res.render('login', { title: 'AskUs!-Login'});
    }
  })
  .post(function(req, res){ //Handles adding a reponse to a question
    if(req.session.validUser){
      var newResponse = {
        rid: db.questions[req.params.id].responses.length,
        response: req.body.resp,
        author: req.body.username,
        time: Date(), //Verify timezone later
        upvotes: [],
        downvotes: []
      };
      db.questions[req.params.id].responses.push(newResponse);
      res.render('question', { title: 'AskUs!', myQid:req.params.id, user: req.session.username});
    }else{
      res.render('login', { title: 'AskUs!-Login'});
    }
  });

/* Route for deleting a question */
router.route('/question/:id/delete')
  .post(function(req, res){
    if(req.session.validUser){
      db.questions[req.params.id].active = false;
      res.render('index', {title: 'AskuUs!-My Questions', user: req.session.username, activeTab: "myquestions"});
    }else{
      res.render('login', {title: 'AskUs!-Login'});
    }
  });

/* Routes for upvote of a repsonse*/
router.get('/vote/up/:qid/:rid', function(req,res){
  if(req.session.validUser){
    var index = 0;
    for (var i = 0; i < db.questions[req.params.qid].responses.length; i++) {
      if (db.questions[req.params.qid].responses[i].rid == req.params.rid){
        index = i;
      }
    }
    var x = db.questions[req.params.qid].responses[index].upvotes.indexOf(req.session.username);
    var y = db.questions[req.params.qid].responses[index].downvotes.indexOf(req.session.username);
    if (x==-1){
      if (y!=-1){
        db.questions[req.params.qid].responses[index].downvotes.splice(y, 1);
      }
      db.questions[req.params.qid].responses[index].upvotes.push(req.session.username);
    } else {
      db.questions[req.params.qid].responses[index].upvotes.splice(x, 1);
    }
    var currVotes = db.questions[req.params.qid].responses[index].upvotes.length - db.questions[req.params.qid].responses[index].downvotes.length;
    res.json({data:currVotes});
  } else {
    res.json({data:currVotes});
  }
});

/* Routes for downvote of a repsonse*/
router.get('/vote/down/:qid/:rid', function(req,res){
  if(req.session.validUser){
    var index = 0;
    for (var i = 0; i < db.questions[req.params.qid].responses.length; i++) {
      if (db.questions[req.params.qid].responses[i].rid == req.params.rid){
        index = i;
      }
    }
    var x = db.questions[req.params.qid].responses[index].upvotes.indexOf(req.session.username);
    var y = db.questions[req.params.qid].responses[index].downvotes.indexOf(req.session.username);
    if (y==-1){
      if (x!=-1) {
        db.questions[req.params.qid].responses[index].upvotes.splice(x, 1);
      }
      db.questions[req.params.qid].responses[index].downvotes.push(req.session.username);
    } else {
      db.questions[req.params.qid].responses[index].downvotes.splice(y, 1);
    }
    var currVotes = db.questions[req.params.qid].responses[index].upvotes.length - db.questions[req.params.qid].responses[index].downvotes.length;
    res.json({data:currVotes});
  } else {
    res.json({data:currVotes});
  }
});

/* Routes for Registration */
router.route('/registration')
  .get(function(req, res){
    res.render('registration', { title: 'AskUs! - Registration'});
  })
  .post(function(req, res){
    //Account validation. Check if account already exist
    var found = db.users.filter(function(acc){
      return acc.username === req.body.username;
    }); 
    ///Create new account if account does not exist yet
    if(found.length === 0){ 
      var newAccount = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.pass
      };
      db.users.push(newAccount);
      res.render('registration', { title: 'AskUs! - Registration', promptSuccess: 'Success! Enjoy your new account.', user: req.session.username});
    }else{
      res.render('registration', { title: 'AskUs! - Registration', promptFail:'Username or email already exist.'});
    }
  });


/* Routes handles logging in */
router.post('/login',function(req,res){
  //Validate credential
  var found = db.users.filter(function(acc){
    return acc.email === req.body.email && acc.password === req.body.password;
  });
  //Initialize session if is valid user
  if(found.length === 1){
    req.session.validUser = true;
    req.session.username = found[0].username;
    res.redirect('/');
  }else{
    req.session.msg = 'Invaild email password combination';
    res.redirect('/');
  }
});

//Destroy session and logout
router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
});

//Create server
var server = app.listen(port, console.log('Now listening on port: %s', port));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
// Will print stacktrace
// Citation: Express
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
// Citation: Express
/*app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

module.exports = app;