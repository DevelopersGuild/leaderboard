var mongoose = require('mongoose')
var validate = require('mongoose-validate')
var Schema = mongoose.Schema

module.exports = function(mongoose) {

    var User = new Schema({
        email               :    {type: String, index: true
                                  validate: [validate.email, 'invalid email address']},
        //id                  :    ObjectId,
        password            :    String,
        name                :    {
            first           :    String,
            last            :    String
        }
    });

    // declare seat covers here too
    var models = {
      Users : mongoose.model('Users', User)
    };
    return models;
}
