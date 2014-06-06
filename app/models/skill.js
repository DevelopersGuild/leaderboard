var mongoose = require('mongoose')
var validate = require('mongoose-validate')
var Schema = mongoose.Schema

module.exports = function(mongoose) {

	var Skill = new Schema({
		name: String,
		weight: Number,
		img: { data: Buffer, contentType: String }
    });



var models = {
     Skills : mongoose.model('Skills', Skill)
    };
    return models;
}
