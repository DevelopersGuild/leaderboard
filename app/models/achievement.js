var mongoose = require('mongoose')
var validate = require('mongoose-validate')
var Schema = mongoose.Schema

module.exports = function(mongoose) {

	var Achievement = new Schema({
		name: String,
		value: String,
		skill: Schema.ObjectId,
		img: { name: String, contentType: String }
    });



var models = {
      Achievements : mongoose.model('Achievements', Achievement)
    };
    return models;
}
