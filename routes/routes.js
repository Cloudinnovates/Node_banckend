'use strict';
module.exports = function (app) {
  var call = require('../controller/controller');

  // todoList Routes
  app.route('/user')
    .get(call.get_all)
    .post(call.create_user);

  app.route('/user/social')
    .post(call.create_social_user);

  app.route('/user/login/email')
    .post(call.login_user_email)
    .put(call.update_user)
    .delete(call.delete_user);

  app.route('/user/login/phone')
    .post(call.login_user_phone);

  app.route('/user/login')
    .post(call.check_user);

  app.route('/sendotp')
    .post(call.send_otp);

}
