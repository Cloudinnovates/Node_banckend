'use strict';

const Nexmo = require('nexmo'); 
var mongoose = require('mongoose'),
  Task = mongoose.model('userprofile'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt');
  


const nexmo = new Nexmo({
  apiKey: '257f1f94',
  apiSecret: '648f0b7285b02390'
});
 


exports.get_all = function (req, res) {
  Task.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_user = function (req, res) {
  var new_task = new Task(req.body);
  var hash = bcrypt.hashSync(req.body.password, 10);
  new_task.password = hash;
  new_task.save(function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_social_user = function (req, res) {
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.login_user_email = (req, res) => {

  var email = req.body.email;
  var password = req.body.password;
  console.log(password + " check pass" + email);
  Task.findOne({ email: email }).exec().then(user => {
    if (user !== null) {
      var hashedPassword = user.password;
      bcrypt.compare(password, hashedPassword, function (err, response) {
        if (response) {

          res.json({
            success: true,
            body: user,
            token: jwt.sign({ email: user.email, fullName: user.name }, 'MYSECRETKEY', {
              expiresIn: 3600 // expires in 24 hours
            })

          });// Passwords match
        } else {
          res.json({
            success: false,
            body: "password does not match"
          });// Passwords don't match
        }
      });
    }
    else
      res.json(
        {
          success: false,
          body: "User doesnot exists"
        }
      );
  });
}

exports.login_user_phone = (req, res) => {

  var phone = req.body.phone;
  var password = req.body.password;
  console.log(password + " check pass " + phone);
  Task.findOne({ phone: phone }).exec().then(user => {
    if (user !== null) {
      var hashedPassword = user.password;
      bcrypt.compare(password, hashedPassword, function (err, response) {
        if (response) {

          res.json({
            success: true,
            body: user,
            token: jwt.sign({ email: user.email, fullName: user.name }, 'MYSECRETKEY', {
              expiresIn: 3600 // expires in 24 hours
            })

          });// Passwords match
        } else {
          res.json({
            success: false,
            body: "password does not match"
          });// Passwords don't match
        }
      });
    }
    else
      res.json(
        {
          success: false,
          body: "User doesnot exists"
        }
      );
  });
}


exports.update_user = function (req, res) {
  Task.findOneAndUpdate({ name: req.params.name }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_user = function (req, res) {
  Task.remove({
    name: req.params.name
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

exports.check_user = (req, res) => {

  var email = req.body.email;
  Task.findOne({ email: email }).exec().then(user => {

    //If E-mail id exist 
    if (user !== null) {
      res.json({
        success: true,
        body: "user exist"
      });
    }
    //If E-mail id doesn't exist 
    else {
      res.json({
        success: false,
        body: "user dont exist"
      });
    }

  });
}

exports.send_otp = (req, res) => {
var phone = req.body.phone;
const from = '918475893792'
const to = phone
const otp = Math.floor(1000 + (9999 - 1000) * Math.random());
const text = 'your OTP is '+otp;
console.log(phone);

// res.json({
//      success: true,
//      secretotp: 1234
// })
nexmo.message.sendSms(from, to, text,{type: 'unicode'},
(err, responseData) => {
if(err){
  console.log(err);
}else {
  res.json({
    success: true,
    secretotp: otp,
    balance: responseData
  });
}
});

  
    }

  




