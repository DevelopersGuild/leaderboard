var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = function(mongoose) {

    var User = new Schema({
        email               :    {type: String, index: true},
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
