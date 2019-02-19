var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt'); 
var jsonParser = bodyParser.json()
var app = express()
var mongoose = require('mongoose');
var express = require('express'); 
var session = require('express-session');
var parseurl = require('parseurl');
app.use(bodyParser.urlencoded({ extended: true }));
const Schema = mongoose.Schema,
objectId = Schema.objectId;

app.use(session({
  secret: 'test session',
  resave: true,
  saveUninitialized: true
}));
app.listen(3000, function() { console.log("Server start")});
app.use(function (req, res, next) {
  var counter = req.session.counter;
  if (!counter)  {counter = req.session.counter = {};
  // get the url pathname
  console.log('get the url pathname');
  }
  var pathname = parseurl(req).pathname;
  // count the counter
  console.log(pathname);
  counter[pathname] = (counter[pathname] || 0) + 1;
  console.log(counter[pathname]);
  next();
});

mongoose.connect('mongodb://localhost/test', err => {
  if(err)
    console.log('connect mongo error', err)
  else
    console.log('conntent mongo success')
})
console.log('state: ',mongoose.connection.readyState);


const courseSchema = new Schema({
  code: { type: String },
  coursename: { type: String },
  credit: { type:Number }
});
const csSchema = new Schema({
  code: { type: String,required:true },
  coursename: { type: String },
  credit: { type:Number }
});
const userSchema = new Schema({
  name: { type: String ,required:true },
  phone: { type: String },
  username: { type: String },
  password:  { type: String },
});
const course = mongoose.model('Ccom', courseSchema,'Ccom');
const gencourse = mongoose.model('Cgeneral', courseSchema,'Cgeneral');
const sumcourse = mongoose.model('Csummer', courseSchema,'Csummer');
const cscourse = mongoose.model('Ccs', csSchema,'Ccs');
const user = mongoose.model('User', userSchema,'User');
app.use(bodyParser.json());

// userSchema.methods.validPassword = function(pw){
//   return bcrypt.compareSync(pw, this.pw);
// };

app.get('/com-sci', function(req, res,next){
 // var courses = new course();
//  course.create( {code : 'cs214' , coursename : 'Social & Professional Ethics' , credit : 3});
  course.find({}, function (err, courses) {
  if (err) res.status(500).send(err);
  else res.status(200).json(courses);
  })
  // course.find({code:req.body.code},function(err,course){
  //   if (err) res.json(err);
  //   else res.json(course)
  // })
});
app.get('/general', function(req, res,next){
   gencourse.find({}, function (err, gencourses) {
   if (err) res.status(500).send(err);
   else res.status(200).json(gencourses);
   })
 });
 app.get('/summer', function(req, res,next){
  sumcourse.find({}, function (err, sumcourses) {
  if (err) res.status(500).send(err);
  else res.status(200).json(sumcourses);
  })
});
app.post('/cs',jsonParser, function(req, res,next){
   let fc = req.body.codeValue;
   console.log(req.body);
   console.log(fc);
   cscourse.findOne({code:fc}, function (err, cscourses) {
    console.log(cscourses);   
    if (err) res.status(500).json({
      err: err
    });
    else {
      res.status(200).json({  
        cscourses: cscourses
      });
    }
  })
});
app.post('/regist', function(req, res, next) {
  let names = req.body.names;
    let phones = req.body.phones;
    let usernames = req.body.usernames;
    let passwords = req.body.passwords;
    // let otp = req.body.otp;
    // if(otp=='123456'){
    let data = new user();
    data.name = names;
    data.phone = phones;
    data.username = usernames;
    // data.password = passwords;
    // data.password = bcrypt.hash(passwords, bcrypt.genSalt(8));
    // data.save()
    bcrypt.hash(passwords, 10, function(err, hash) {
      // Store hash in database
      data.password = hash;
      data.save()
    })
  // .then(item => {
  //   res.send("item saved to database");
  // })
  // .catch(err => {
  //   res.status(400).send("unable to save to database");
  // });
// }
  res.redirect('/');
});
app.post('/login', function(req, res){
  let usernames = req.body.username;
  let passwords = req.body.password;
  user.find({username:usernames}, (err,users) =>{
    // console.log(users[0].password)
    if(!users){
      res.send("Click <a href='/myInfo'>here</a> to login again");
    }else{
      if(bcrypt.compareSync(passwords, users[0].password)){
        // res.send("login success! Click <a href='/recommend'>here</a> to see the authorized content.");
        req.session.inSession = true;
        req.session.user = req.body.username;
        // res.redirect('/myInfologout')
        res.redirect('/myInfologout')
      }else{
        err :'USER INVALID'
        res.redirect('/myInfo')
      }
    }
   
  })
});
app.get('/logout',function(req,res){    
  // req.session.destroy(function(err){  
      // if(err){  
      //     console.log(err);  
      // }  
      // else  
      // {  
          res.redirect('/myInfo');  
      // }  
  // });  
});  
// app.get('/', function (req, res) {
//   res.send("Welcome to this home page. Please <a href=http://" 
//     + req.hostname+":" + port + "/login>login</a> to see authorized content");
// });
app.get('/username', function(req, res,next){
  user.find({}, function (err, uuser) {
  if (err) res.status(500).send(err);
  else res.status(200).json(uuser);
  })
});
app.post('/getuser', function(req, res,next){
  let fc1 = req.body.nameValue;
  let fc2 = req.body.userValue;
  user.find({ $and: [{name:fc1, username:fc2}]}, function (err, uuser) {
  // user.findOne({name:fc1, username:fc2}, function (err, uuser) {
   console.log(uuser);   
   if (err) res.status(500).json({
     err: err,
     uuser: uuser
   });
   else {
     res.status(200).json({  
      uuser: uuser  
     });
   }
 })
});
app.post('/insert',jsonParser, function(req, res,next){
  let codes = req.body.code;
  let names = req.body.name;
  let credits = req.body.credit;
  let select = req.body.selectedOption2;
  console.log("insert")
  if(select === 'radio4') {
    let model = new course();
    model.code = codes;
    model.coursename = names;
    model.credit = credits;
    model.save().then(() => {
      console.log('model save success.')
    })
    .catch(err => {
      console.log('err:', err)
    })
  } else if(select === 'radio5') {
    let model = new gencourse();
    model.code = codes;
    model.coursename = names;
    model.credit = credits;
    model.save().then(() => {
      console.log('model save success.')
    })
    .catch(err => {
      console.log('err:', err)
    })
  }else if(select === 'radio6') {
    let model = new sumcourse();
    model.code = codes;
    model.coursename = names;
    model.credit = credits;
    model.save().then(() => {
      console.log('model save success.')
    })
    .catch(err => {
      console.log('err:', err)
    })
  }
});
app.delete('/remove',jsonParser, function(req, res,next){
  let rcode = req.body.code;
  let rcoursename = req.body.coursename;
  let rcredit = req.body.credit;
  let rselect = req.body.selectedOption2;
  console.log(rcode)
  if(rselect === 'radio4') {
    // console.log("pass condition")
      // course.findOneAndRemove({code:rcode},(err,res) =>{ 
        course.findOneAndRemove({ $and: [{code:rcode, coursename:rcoursename, credit:rcredit}]},function (err,res) { 
      // console.log('remove success')
      res:res
      if(res!=null){console.log('remove success')}
      else{console.log('not found item')}  
      })
      .catch(err => {
        console.log('err:', err)
      })
  }else if (rselect === 'radio5'){ 
    // gencourse.findOneAndRemove({code:rcode},(err,res) =>{ 
      gencourse.findOneAndRemove({ $and: [{code:rcode, coursename:rcoursename, credit:rcredit}]},(err,res) =>{ 
        if(res!=null){console.log('remove success')}
        else{console.log('not found item')}  
    })
    .catch(err => {
      console.log('err:', err)
    })
  }else if (rselect === 'radio6'){ 
    sumcourse.findOneAndRemove({ $and: [{code:rcode, coursename:rcoursename, credit:rcredit}]},(err,res) =>{ 
      if(res!=null){console.log('remove success')}
      else{console.log('not found item')}  
    // sumcourse.findOneAndRemove({code:rcode},(err,res) =>{ 
    // console.log('remove success')
    })
    .catch(err => {
      console.log('err:', err)
    })
  }else{}
});
app.post('/getcom', function(req, res,next){
  let fc1 = req.body.codeValue;
  let fc2 = req.body.coursenameValue;
  let fc3 = req.body.creditValue;
  course.find({ $and: [{code:fc1, coursename:fc2, credit:fc3}]}, function (err, tablecs) {
  //  console.log(tablecs);   
   if (err) res.status(500).json({
     err: err,
     tablecs: tablecs
   });
   else {
     res.status(200).json({  
      tablecs: tablecs  
     });
   }
 })
});
app.post('/getgen', function(req, res,next){
  let fc1 = req.body.codeValue;
  let fc2 = req.body.coursenameValue;
  let fc3 = req.body.creditValue;
  gencourse.find({ $and: [{code:fc1, coursename:fc2, credit:fc3}]}, function (err, tablegen) {
  //  console.log(tablegen);   
   if (err) res.status(500).json({
     err: err,
     tablegen: tablegen
   });
   else {
     res.status(200).json({  
      tablegen: tablegen  
     });
   }
 })
});
app.post('/getsummer', function(req, res,next){
  let fc1 = req.body.codeValue;
  let fc2 = req.body.coursenameValue;
  let fc3 = req.body.creditValue;
  sumcourse.find({ $and: [{code:fc1, coursename:fc2, credit:fc3}]}, function (err, tablesum) {
  //  console.log(tablesum);   
   if (err) res.status(500).json({
     err: err,
     tablesum: tablesum
   });
   else {
     res.status(200).json({  
      tablesum: tablesum  
     });
   }
 })
});
app.post('/update',jsonParser,function(req, res, next) {
  let code = req.body.code;
  let rcode = req.body.codeU;
  let rcoursename = req.body.nameU;
  let rcredit = req.body.creditU;
  let rselect = req.body.selectedOption3;
  let newvalues = { $set: {code:rcode, coursename:rcoursename, credit:rcredit} };
  if(rselect === 'radio7') {
    // console.log("pass condition")
    course.updateOne({code:code},newvalues,function (err,res) {
      // console.log(uu)
      res:res
      console.log('course res: ',res);
      if(res!=null){console.log('update success')}
      else{console.log('not found item')}
    })
    .catch(err => {
      console.log('err:', err)
    })
  }else if (rselect === 'radio8'){
    gencourse.updateOne({code:code},newvalues,function (err,res) {
      res:res
      console.log('gencourse res: ',res);
      if(res!=null){console.log('update success')}
      else{console.log('not found item')}
    })
    .catch(err => {
      console.log('err:', err)
    })
  }else if (rselect === 'radio9'){
    sumcourse.updateOne({code:code},newvalues,function (err,res) {
      res:res
      console.log('sumcourse res: ',res);
      if(res!=null){console.log('update success')}
      else{console.log('not found item')}
    })
    .catch(err => {
      console.log('err:', err)
    })
  }else{

  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  console.log("error 404"); 
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;