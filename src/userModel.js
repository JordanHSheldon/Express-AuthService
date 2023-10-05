var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

UserSchema = new Schema({
  fname: {type: String, "default": ''},
  lname: {type: String, "default": ''},
  email: {type: String, "default": ''},
  username: {type: String, "default": ''},
  password: {type: String, "default": ''},
});

User = mongoose.model('users', UserSchema); //name of collection is 'users'

module.exports.User = User;
module.exports.Schema = UserSchema;