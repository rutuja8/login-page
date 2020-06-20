const { check, validationResult } = require('express-validator');
const express = require('express');
const app = express();
//const expressValidator = require('express-validator');
const PORT = 3000;
const bodyParser = require("body-parser");
const http = require("http");
app.use(bodyParser.urlencoded());
app.listen(PORT, function(req,res) {
    console.log('server is running on PORT :' , PORT);

});
app.get('/' , function(req,res){
    res.sendfile('register.html');
});
app.get('/register' , function(req,res){
    res.sendfile('register.html');
});
;

app.get('/login', function(req,res){
  res.sendfile('login.html');
});


//database connection

const { Client } = require('pg'); 

const client = new Client({
    user: 'clientinfo',
    host: 'localhost',
    database: 'clientinfo',
    password: '123',
    PORT : 5432
    
  });
  
  client.connect();
 
  
  
 client.query('select * from users' , (err,res) => {
     console.log(err,res);
     client.end();
 });



//validation code
// app.post('/', (req, res) => {
//     User.create({
//         name : req.body.name,
//         email : req.body.email,
//         gender : req.body.gender,
//         username : req.body.username,
//         password : req.body.password,
        
//     }).then(user => res.json(user));
//   });
  
  
  app.post('/register', [
 
    check('name',"Please enter name").isAlpha(),
    
    check('email', "Invalid email").isEmail(),
    check('username',"Please enter username").isAlphanumeric(),
    check('password',"Password must be at least with 8 characters").isLength({min : 8}).matches(/\d/).withMessage('must contain a number'),
    // check('password').custom((value, { req }) => {
    //     if (value !== req.body.conpswd) {
    //       throw new Error('Password confirmation is incorrect');
    //     }
    //   })
  ], (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else{

      //for experimental purpose i did this
      return res.sendfile('login.html'); 
     
    }


    
  });
  
    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     gender : req.body.gender,
    //     username : req.body.username,
    //     password : req.body.password,
    //     //conpswd : req.body.conpswd
        
    //   }).then(user => res.json(user));
    // });



app.post('/register' , function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var gender = req.body.gender;
  var username = req.body.username;
  var password = req.body.password;
  const text = 'INSERT INTO users(name,email,gender,username,password) VALUES($1, $2, $3, $4 , $5) RETURNING *'
const values = [name,email,gender,username,password]

  
  client.query(text,values, (err, res) => {
      if (err) {
          console.error(err);
          return;
      }
      console.log('Data insert successful');
      client.end();
  });


});
 