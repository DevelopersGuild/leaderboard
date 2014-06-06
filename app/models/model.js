var mongoose = require('mongoose')
var validate = require('mongoose-validate')
var Schema = mongoose.Schema

module.exports = function(mongoose) {
var models = {
      Users : mongoose.model('Users', User)
      UserAchivements : mongoose.model('UserAchivements', UserAchivement)
      UserSkills : mongoose.model('UserSkills', UserSkill)	

    };
    return models;
}

